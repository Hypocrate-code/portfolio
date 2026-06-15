"use client";

import React, { useRef, useState, useEffect, ReactElement, cloneElement, ReactNode } from "react";

function getLetterDelay(index: number, length: number, width: number, isH1OrH2: boolean): string {
  if (width <= 650 && isH1OrH2) {
    return `${Math.abs((length / 2) - index) * 0.03}s`;
  }
  return `${index * 0.019}s`;
}

function createAnimatedSpans(text: string, width: number, isH1OrH2: boolean) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < text.length; i++) {
    const span = document.createElement("span");
    span.className = "animatedLetter";
    span.style.setProperty("--n", getLetterDelay(i, text.length, width, isH1OrH2));
    span.textContent = text[i];
    fragment.appendChild(span);
  }

  return fragment;
}

function processTextNodes(root: HTMLElement) {
  if (root.querySelector(".animatedLetter")) return;

  const width = window.innerWidth;
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        return node.nodeValue && node.nodeValue.trim().length
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    }
  );

  const textNodes: Text[] = [];
  let currentNode = walker.nextNode() as Text | null;

  while (currentNode) {
    textNodes.push(currentNode);
    currentNode = walker.nextNode() as Text | null;
  }

  textNodes.forEach((textNode) => {
    const parent = textNode.parentElement;
    if (!parent) return;

    const isHeading = parent.tagName === "H1" || parent.tagName === "H2";
    const fragment = createAnimatedSpans(textNode.textContent ?? "", width, isHeading);
    parent.replaceChild(fragment, textNode);
  });
}

function toggleHeadingClasses(root: HTMLElement, active: boolean) {
  root.querySelectorAll("h1, h2, h3").forEach((heading) => {
    heading.classList.toggle("barToShow", active);
  });
}

function ContainerBarToShow({ children }: { children: ReactNode }) {
  const myRef = useRef<HTMLElement | null>(null);
  const [hasBeenSeen, setSeen] = useState(false);

  useEffect(() => {
    const el = myRef.current;
    if (!el) return;

    processTextNodes(el);
  }, []);

  useEffect(() => {
    const el = myRef.current;
    if (!el) return;

    toggleHeadingClasses(el, !hasBeenSeen);
  }, [hasBeenSeen]);

  useEffect(() => {
    const el = myRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -55px 0px" }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const attachRef = (node: HTMLElement | null) => {
    myRef.current = node;
  };

  const barClass = hasBeenSeen ? "" : "barToShow";

  if (React.isValidElement(children) && typeof (children as ReactElement).type === "string") {
    const child = children as ReactElement<any>;

    return cloneElement(child, {
      className: `${child.props.className ?? ""} ${barClass}`.trim(),
      ref: attachRef,
    });
  }

  return (
    <div ref={attachRef} className={barClass}>
      {children}
    </div>
  );
}

export default ContainerBarToShow;
