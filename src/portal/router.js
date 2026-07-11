/**
 * Portal router — member area, staff CMS, auth.
 */

import {
  clearSessionCookieHeader,
  destroySession,
  ensureStaffSeed,
  getSessionUser,
  isSecureRequest,
  json,
  redirect,
} from './auth.js';
import { ensureProductSeed } from './db.js';
import {
  adminDashboard,
  adminMembers,
  adminOrderDetail,
  adminOrderNew,
  adminOrders,
  adminProductEdit,
  adminProducts,
  adminRequests,
  handleAdminApi,
} from './admin.js';
import {
  handleAuthApi,
  handleMemberApi,
  handleVerify,
  loginPage,
  memberDashboard,
  memberDownloads,
  memberGuidelines,
  memberOrderDetail,
  memberOrders,
  memberProfile,
  memberRequests,
  memberSupport,
} from './member.js';

function flashFromUrl(url) {
  return {
    flash: url.searchParams.get('ok') || null,
    flashError: url.searchParams.get('error') || null,
  };
}

function requireDb(env) {
  if (!env.DB) {
    return json(
      {
        error:
          'Database is not configured. Add a D1 binding (DB) in wrangler.toml and run migrations.',
      },
      503
    );
  }
  return null;
}

export async function handlePortal(request, env, pathname, templateData) {
  const dbErr = requireDb(env);
  // Allow login pages to show even if we need to message about DB — but APIs need DB
  const needsDb =
    pathname.startsWith('/api/') ||
    pathname.startsWith('/member') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/auth/');

  if (needsDb && dbErr) return dbErr;

  if (env.DB) {
    await ensureStaffSeed(env);
    await ensureProductSeed(env, templateData);
  }

  const url = new URL(request.url);
  const { flash, flashError } = flashFromUrl(url);

  // Auth pages
  if (pathname === '/login' || pathname === '/login/member') {
    const magicLink = url.searchParams.get('dev_link');
    return loginPage({ flash, flashError, mode: 'member', magicLink });
  }
  if (pathname === '/login/staff') {
    return loginPage({ flash, flashError, mode: 'staff' });
  }
  if (pathname === '/auth/verify') {
    return handleVerify(request, env);
  }
  if (pathname === '/auth/logout') {
    await destroySession(env, request);
    return redirect('/', {
      'Set-Cookie': clearSessionCookieHeader(isSecureRequest(request)),
    });
  }
  if (pathname.startsWith('/api/auth/')) {
    return handleAuthApi(request, env, pathname);
  }

  const user = await getSessionUser(env, request);

  // Member area
  if (pathname === '/member' || pathname.startsWith('/member/')) {
    if (!user) return redirect('/login');
    if (user.role === 'staff') {
      // Staff can still use member view of their own account if they have one,
      // but typically redirect staff to admin unless they want member pages.
      // Allow staff into member area only if they navigate there intentionally —
      // keep access for testing; admin is separate.
    }

    if (pathname === '/member') return memberDashboard(env, user);
    if (pathname === '/member/orders') return memberOrders(env, user);
    const orderMatch = pathname.match(/^\/member\/orders\/(\d+)$/);
    if (orderMatch) return memberOrderDetail(env, user, Number(orderMatch[1]));
    if (pathname === '/member/downloads') return memberDownloads(env, user);
    if (pathname === '/member/guidelines') return memberGuidelines(env, user);
    if (pathname === '/member/requests') {
      return memberRequests(env, user, flash, flashError);
    }
    if (pathname === '/member/profile') {
      // refresh user fields
      const fresh = await env.DB.prepare(
        `SELECT id, email, name, phone, business_name, role FROM users WHERE id = ?`
      )
        .bind(user.id)
        .first();
      return memberProfile(env, fresh || user, flash, flashError);
    }
    if (pathname === '/member/support') return memberSupport(user);
  }

  if (pathname.startsWith('/api/member/')) {
    if (!user) return json({ error: 'Unauthorized' }, 401);
    return handleMemberApi(request, env, user, pathname);
  }

  // Staff CMS
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    if (!user) return redirect('/login/staff');
    if (user.role !== 'staff') {
      return redirect('/member?error=' + encodeURIComponent('Staff access only.'));
    }

    if (pathname === '/admin') return adminDashboard(env, user);
    if (pathname === '/admin/products') {
      return adminProducts(env, user, flash, flashError);
    }
    if (pathname === '/admin/products/new') {
      return adminProductEdit(env, user, 'new', flash, flashError);
    }
    const prodMatch = pathname.match(/^\/admin\/products\/(\d+)$/);
    if (prodMatch) {
      return adminProductEdit(env, user, Number(prodMatch[1]), flash, flashError);
    }
    if (pathname === '/admin/orders') {
      return adminOrders(env, user, flash, flashError);
    }
    if (pathname === '/admin/orders/new') {
      return adminOrderNew(env, user, flash, flashError);
    }
    const ordMatch = pathname.match(/^\/admin\/orders\/(\d+)$/);
    if (ordMatch) {
      return adminOrderDetail(env, user, Number(ordMatch[1]), flash, flashError);
    }
    if (pathname === '/admin/members') return adminMembers(env, user);
    if (pathname === '/admin/requests') {
      return adminRequests(env, user, flash, flashError);
    }
  }

  if (pathname.startsWith('/api/admin/')) {
    if (!user || user.role !== 'staff') return json({ error: 'Unauthorized' }, 401);
    return handleAdminApi(request, env, user, pathname);
  }

  return null; // not a portal route
}
