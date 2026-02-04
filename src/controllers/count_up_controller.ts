import { Controller } from "@hotwired/stimulus";

type Targets = "value";

export default class CountUpController extends Controller {
    static targets: Targets[] = ["value"];
    static values = { target: Number };

    declare readonly valueTarget: HTMLElement;
    declare targetValue: number;

    private observer: IntersectionObserver | null = null;
    private hasRun = false;

    connect() {
        this.observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting && !this.hasRun) {
                        this.hasRun = true;
                        this.animate();
                        this.observer?.unobserve(entry.target);
                    }
                }
            },
            { threshold: 0.35 },
        );

        this.observer.observe(this.element);
    }

    disconnect() {
        this.observer?.disconnect();
        this.observer = null;
    }

    private animate() {
        const target = Number.isFinite(this.targetValue) ? this.targetValue : 99.7;
        const start = 0;
        const durationMs = 900;

        const startTime = performance.now();
        const step = (now: number) => {
            const t = Math.min(1, (now - startTime) / durationMs);
            const eased = 1 - Math.pow(1 - t, 3);
            const current = start + (target - start) * eased;
            this.valueTarget.textContent = current.toFixed(1);
            if (t < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    }
}

Error: File does not exist: /workspace/src/controllers/count_up_controller.ts