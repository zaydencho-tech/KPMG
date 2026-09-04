export const ADVISORY_REQUEST_EVENT = "advisory:open-request";

export const requestAdvisoryForm = (index = 0) => {
  window.dispatchEvent(new CustomEvent(ADVISORY_REQUEST_EVENT, { detail: { index } }));

  window.requestAnimationFrame(() => {
    document.getElementById("service")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
};
