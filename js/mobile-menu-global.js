document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("/admin/")) {
        return;
    }

    if (document.getElementById("mobileMenuPanel") || document.getElementById("mobileMenuBtn")) {
        return;
    }

    const style = document.createElement("style");
    style.textContent = `
        #globalMobileMenuTrigger { position: fixed; top: 0.75rem; right: 0.75rem; z-index: 2147483647; display: flex; align-items: center; gap: 0.5rem; }
        #globalMobileMenuOverlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 2147483646; display: none; }
        #globalMobileMenuPanel { position: fixed; top: 0; left: 0; height: 100vh; width: min(100%, 20rem); background: #0f172a; color: #fff; z-index: 2147483647; transform: translateX(-100%); transition: transform 0.3s ease; box-shadow: 0 10px 30px rgba(0,0,0,0.4); }
        #globalMobileMenuPanel details summary::-webkit-details-marker { display: none; }
        @media (min-width: 768px) { #globalMobileMenuTrigger { display: none !important; } }
    `;
    document.head.appendChild(style);

    const trigger = document.createElement("div");
    trigger.id = "globalMobileMenuTrigger";
    trigger.innerHTML = `
        <a href="sarongo.html" style="background:#fbbf24;color:#0f172a;padding:0.35rem 0.6rem;border-radius:0.5rem;font-weight:600;font-size:0.85rem;text-decoration:none;">Sarongo</a>
        <button id="globalMobileMenuBtn" aria-label="Menu" style="background:transparent;border:1px solid rgba(255,255,255,0.2);color:#fff;border-radius:0.5rem;padding:0.4rem;display:flex;align-items:center;justify-content:center;">
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </button>
    `;

    const overlay = document.createElement("div");
    overlay.id = "globalMobileMenuOverlay";

    const panel = document.createElement("div");
    panel.id = "globalMobileMenuPanel";
    panel.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:1rem;border-bottom:1px solid rgba(255,255,255,0.1);">
            <div style="font-weight:800;">TIGSBD</div>
            <button id="globalMobileMenuClose" style="background:transparent;border:none;color:#fff;font-size:1.4rem;line-height:1;">&times;</button>
        </div>
        <nav style="padding:1rem;display:flex;flex-direction:column;gap:0.5rem;">
            <a href="index.html" style="color:#fff;text-decoration:none;padding:0.65rem;border-radius:0.6rem;">Home</a>
            <a href="products.html" style="color:#fff;text-decoration:none;padding:0.65rem;border-radius:0.6rem;">Products</a>
            <details style="padding:0.65rem;border-radius:0.6rem;background:rgba(255,255,255,0.03);">
                <summary style="cursor:pointer;font-weight:600;">Categories</summary>
                <div style="margin-top:0.5rem;display:flex;flex-direction:column;gap:0.4rem;padding-left:0.6rem;">
                    <a href="products.html?category=1" style="color:#e2e8f0;text-decoration:none;">Electronics</a>
                    <a href="products.html?category=2" style="color:#e2e8f0;text-decoration:none;">Fashion</a>
                    <a href="sarongo.html" style="color:#e2e8f0;text-decoration:none;">Sarongo Collection</a>
                    <a href="products.html?category=4" style="color:#e2e8f0;text-decoration:none;">Home & Living</a>
                </div>
            </details>
            <a href="cart.html" style="color:#fff;text-decoration:none;padding:0.65rem;border-radius:0.6rem;">Cart</a>
            <a href="wishlist.html" style="color:#fff;text-decoration:none;padding:0.65rem;border-radius:0.6rem;">Wishlist</a>
            <a href="login.html" style="color:#0f172a;background:#fbbf24;text-decoration:none;padding:0.65rem;border-radius:0.6rem;font-weight:700;text-align:center;">Login</a>
        </nav>
    `;

    document.body.appendChild(trigger);
    document.body.appendChild(overlay);
    document.body.appendChild(panel);

    const openMenu = () => {
        panel.style.transform = "translateX(0)";
        overlay.style.display = "block";
        document.body.style.overflow = "hidden";
    };

    const closeMenu = () => {
        panel.style.transform = "translateX(-100%)";
        overlay.style.display = "none";
        document.body.style.overflow = "";
    };

    const openBtn = document.getElementById("globalMobileMenuBtn");
    const closeBtn = document.getElementById("globalMobileMenuClose");

    if (openBtn) openBtn.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);
    panel.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeMenu();
    });
});
