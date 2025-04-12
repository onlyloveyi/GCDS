// 主题加载器
function loadTheme() {
    // 尝试获取用户选择的主题
    const selectedTheme = localStorage.getItem('selected-theme') || '1';
    
    // 应用主题到body
    document.body.className = '';
    document.body.classList.add('theme-' + selectedTheme);
    
    // 如果在iframe中，尝试通知父窗口已应用主题
    if (window.parent && window.parent !== window) {
        try {
            window.parent.postMessage({
                type: 'THEME_APPLIED',
                theme: selectedTheme
            }, '*');
        } catch (e) {
            console.error('无法向父窗口发送消息', e);
        }
    }
}

// 页面加载完成后应用主题
document.addEventListener('DOMContentLoaded', loadTheme);

// 监听来自父窗口的主题变更消息
window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'THEME_CHANGE') {
        // 保存并应用新主题
        localStorage.setItem('selected-theme', event.data.theme);
        loadTheme();
    }
}); 