import { XRButton } from 'three/examples/jsm/webxr/XRButton.js';

export function setupXR(renderer, sessionInit = { optionalFeatures: ['hand-tracking'] }) {
    const button = XRButton.createButton(renderer, sessionInit);
    document.body.appendChild(button);
}
