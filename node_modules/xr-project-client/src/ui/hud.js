export function createHUD() {
    const root = document.createElement('div');
    root.style.position = 'fixed';
    root.style.top = '16px';
    root.style.left = '16px';
    root.style.maxWidth = '420px';
    root.style.padding = '12px 14px';
    root.style.background = 'rgba(15, 23, 42, 0.78)';
    root.style.backdropFilter = 'blur(8px)';
    root.style.border = '1px solid rgba(148, 163, 184, 0.4)';
    root.style.borderRadius = '12px';
    root.style.color = '#f8fafc';
    root.style.fontFamily = 'Segoe UI, PingFang SC, sans-serif';
    root.style.zIndex = '1000';
    root.style.lineHeight = '1.45';

    const title = document.createElement('div');
    title.style.fontSize = '17px';
    title.style.fontWeight = '700';

    const subtitle = document.createElement('div');
    subtitle.style.marginTop = '4px';
    subtitle.style.fontSize = '13px';
    subtitle.style.opacity = '0.92';

    const tips = document.createElement('div');
    tips.style.marginTop = '8px';
    tips.style.fontSize = '12px';
    tips.style.opacity = '0.8';

    root.appendChild(title);
    root.appendChild(subtitle);
    root.appendChild(tips);
    document.body.appendChild(root);

    return {
        setCard({ titleText, subtitleText, tipsText }) {
            title.textContent = titleText || '';
            subtitle.textContent = subtitleText || '';
            tips.textContent = tipsText || '';
        },
        dispose() {
            root.remove();
        },
    };
}
