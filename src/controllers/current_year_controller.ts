import { Controller } from "@hotwired/stimulus";

export default class CurrentYearController extends Controller {
    connect() {
        this.element.textContent = String(new Date().getFullYear());
    }
}
