import { Controller } from "@hotwired/stimulus";

type ConfettiToken = {
    el: HTMLSpanElement;
    startX: number;
    startY: number;
    dx: number;
    dy: number;
    rot: number;
    rotSpeed: number;
    lifeMs: number;
    startTime: number;
};

export default class SwarmHypeController extends Controller {
    static classes = ["approvedClass"];
    declare approvedClass: string;

    private handleApprovedBound = (e: Event) => {
        const ce = e as CustomEvent<{ finalName?: string }>;
        this.fireConfetti(ce.detail?.finalName);
    };

    connect() {
        this.element.addEventListener("swarm:approved", this.handleApprovedBound);
    }

    disconnect() {
        this.element.removeEventListener("swarm:approved", this.handleApprovedBound);
    }

    private fireConfetti(finalName?: string) {
        const rect = this.element.getBoundingClientRect();
        const originX = rect.width * 0.72;
        const originY = rect.height * 0.58;

        const tokens = [
            "Facade",
            "Orchestrator",
            "Coordinator",
            "Enterprise",
            "Manager",
            "Adapter",
            "Strategy",
            "Synergy",
        ];

        const chosen = finalName?.includes("ComplianceAdapter") ? [...tokens, "Control", "Audit", "Policy"] : tokens;

        const count = 18;
        const bits: ConfettiToken[] = [];

        for (let i = 0; i < count; i++) {
            const el = document.createElement("span");
            el.className = "naming-confetti";
            el.textContent = chosen[Math.floor(Math.random() * chosen.length)];
            el.style.left = `${originX}px`;
            el.style.top = `${originY}px`;
            this.element.appendChild(el);

            bits.push({
                el,
                startX: originX,
                startY: originY,
                dx: (Math.random() - 0.5) * 240,
                dy: -140 - Math.random() * 180,
                rot: Math.random() * 180,
                rotSpeed: (Math.random() - 0.5) * 260,
                lifeMs: 900 + Math.random() * 500,
                startTime: performance.now(),
            });
        }

        const tick = (now: number) => {
            let alive = 0;

            for (const b of bits) {
                const age = now - b.startTime;
                const t = Math.min(1, age / b.lifeMs);
                const x = b.startX + b.dx * t;
                // gravity-ish
                const y = b.startY + b.dy * t + 240 * t * t;
                const opacity = 1 - t;
                const rot = b.rot + b.rotSpeed * t;

                b.el.style.transform = `translate(${x - b.startX}px, ${y - b.startY}px) rotate(${rot}deg)`;
                b.el.style.opacity = `${opacity}`;

                if (t < 1) alive++;
            }

            if (alive > 0) {
                requestAnimationFrame(tick);
            } else {
                for (const b of bits) b.el.remove();
            }
        };

        requestAnimationFrame(tick);
    }
}
