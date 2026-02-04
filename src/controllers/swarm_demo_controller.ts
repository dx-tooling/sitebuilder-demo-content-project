import { Controller } from "@hotwired/stimulus";

type Targets =
    | "input"
    | "output"
    | "status"
    | "spinner"
    | "complianceToggle"
    | "complianceHint"
    | "approvalNote"
    | "llmLine";

export default class SwarmDemoController extends Controller {
    static targets: Targets[] = [
        "input",
        "output",
        "status",
        "spinner",
        "complianceToggle",
        "complianceHint",
        "approvalNote",
        "llmLine",
    ];

    declare readonly inputTarget: HTMLElement;
    declare readonly outputTarget: HTMLElement;
    declare readonly statusTarget: HTMLElement;
    declare readonly spinnerTarget: HTMLElement;
    declare readonly complianceToggleTarget: HTMLInputElement;
    declare readonly complianceHintTarget: HTMLElement;
    declare readonly approvalNoteTarget: HTMLElement;
    declare readonly llmLineTarget: HTMLElement;

    private timers: number[] = [];
    private isRunning = false;

    private candidates = [
        "EnterpriseReportingOrchestrationServiceFacade",
        "StrategicReportDeliveryEnablementCoordinator",
        "HolisticReportingSynergyOrchestrator",
        "OperationalReportExperienceManager",
    ];

    disconnect() {
        this.clearTimers();
    }

    run() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.outputTarget.classList.remove("swarm-approved");

        const complianceOn = this.complianceToggleTarget.checked;
        this.statusTarget.textContent = complianceOn
            ? "Submitting Form N-AME/9001-B…"
            : "Spinning up the swarm…";
        this.spinnerTarget.classList.remove("hidden");

        const roll = (name: string) => {
            this.outputTarget.textContent = `ApprovedName:\n${name}`;
        };

        // Slot-machine-ish roll through candidates
        const rollNames = complianceOn
            ? this.candidates.map((c) => `${c}ComplianceAdapter`)
            : this.candidates;

        roll(rollNames[0]);

        this.timers.push(
            window.setTimeout(() => roll(rollNames[1]), 300),
            window.setTimeout(() => roll(rollNames[2]), 650),
            window.setTimeout(() => roll(rollNames[3]), 950),
        );

        // Final approved stop
        this.timers.push(
            window.setTimeout(() => {
                const finalName = complianceOn
                    ? "EnterpriseReportingOrchestrationServiceFacadeComplianceAdapter"
                    : "EnterpriseReportingOrchestrationServiceFacade";

                roll(finalName);
                this.outputTarget.classList.add("swarm-approved");

                this.statusTarget.textContent = complianceOn
                    ? "Approved. Audit trail emotionally complete."
                    : "Approved. One name. Deep peace.";
                this.spinnerTarget.classList.add("hidden");

                this.approvalNoteTarget.textContent = complianceOn
                    ? "One final name. Two signatures. Three stamps."
                    : "One final name. No appeals.";

                this.llmLineTarget.innerHTML = complianceOn
                    ? "Chain-of-thought: <span class=\"font-semibold\">internal &amp; redacted</span> · temperature=0.7 · logit_bias={ \"Facade\": +2, \"ComplianceAdapter\": +9 }"
                    : "Chain-of-thought: <span class=\"font-semibold\">internal &amp; redacted</span> · temperature=0.7 · logit_bias={ \"Facade\": +2 }";

                // Trigger naming confetti
                this.element.dispatchEvent(
                    new CustomEvent("swarm:approved", {
                        bubbles: true,
                        detail: { finalName },
                    }),
                );

                this.isRunning = false;
            }, 1300),
        );
    }

    toggleCompliance() {
        const on = this.complianceToggleTarget.checked;
        this.complianceHintTarget.textContent = on
            ? "ON: ISO-Name-9001 posture engaged. SOC2 Naming Controls: vigilant."
            : "OFF: empathetic. ON: bureaucratically soothing.";
    }

    private clearTimers() {
        for (const t of this.timers) window.clearTimeout(t);
        this.timers = [];
        this.isRunning = false;
    }
}

Error: File does not exist: /workspace/src/controllers/swarm_demo_controller.ts