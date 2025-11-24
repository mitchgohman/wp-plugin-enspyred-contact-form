import { createRoot } from "react-dom/client";
import axios from "./core/axios.js";
import { debugLog, debugError } from "./core/debug.js";

import EnspyredContactForm from "./EnspyredContactForm.jsx";

const fetchConfig = async (configId) => {
    try {
        const response = await axios.get(
            `config?key=${encodeURIComponent(configId)}`
        );
        return response.data;
    } catch (error) {
        throw new Error(
            `Config load failed (${error.response?.status || "network error"})`
        );
    }
};

const mountAll = () => {
    const nodes = document.querySelectorAll(".enspyred-plugin-contact-form");
    nodes.forEach(async (el) => {
        if (el.__ecf_mounted) return;
        el.__ecf_mounted = true;

        const configId = el.dataset.ecfConfig || "default";
        const root = createRoot(el);
        root.render(<div aria-live="polite">Loading form…</div>);

        try {
            const resp = await fetchConfig(configId);
            const { globalSettings, formConfig } = resp;

            debugLog({ formConfig });

            root.render(
                <EnspyredContactForm
                    globalSettings={globalSettings}
                    formConfig={formConfig}
                    formId={configId}
                />
            );
        } catch (err) {
            debugError(err);
            root.render(
                <div aria-live="polite" style={{ color: "crimson" }}>
                    Failed to load form config: {configId}
                </div>
            );
        }
    });
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountAll);
} else {
    mountAll();
}

// Support Vite HMR during development
if (import.meta.hot) {
    import.meta.hot.accept(() => {
        mountAll();
    });
}
