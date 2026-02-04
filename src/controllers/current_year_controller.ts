import { Controller } from "@hotwired/stimulus";

export default class CurrentYearController extends Controller {
    connect() {
        this.element.textContent = String(new Date().getFullYear());
    }
}

Error: File does not exist: /workspace/src/controllers/current_year_controller.ts