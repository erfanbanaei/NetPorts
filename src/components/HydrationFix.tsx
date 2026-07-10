"use client";

import { useEffect } from "react";

export function HydrationFix() {
  useEffect(() => {
    const rm = () => {
      if (document.body.hasAttribute("cz-shortcut-listen"))
        document.body.removeAttribute("cz-shortcut-listen");
    };
    rm();
    const obs = new MutationObserver((muts) =>
      muts.forEach(
        (m) =>
          m.type === "attributes" &&
          m.attributeName === "cz-shortcut-listen" &&
          rm()
      )
    );
    obs.observe(document.body, {
      attributes: true,
      attributeFilter: ["cz-shortcut-listen"],
    });
    return () => obs.disconnect();
  }, []);
  return null;
}