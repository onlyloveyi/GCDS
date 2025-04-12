// 主题加载器
function loadTheme() {
    // 尝试获取用户选择的主题
    const selectedTheme = localStorage.getItem('selected-theme') || '1';
    
    // 应用主题到body
    document.body.className = '';
    document.body.classList.add('theme-' + selectedTheme);
    
    // 根据主题应用特定的字体
    applyThemeSpecificStyles(selectedTheme);
    
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

// 应用主题特定的样式
function applyThemeSpecificStyles(themeNumber) {
    const fontFamilies = {
        // 默认现代蓝色 - 系统字体
        '1': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        // 扁平科技风格 - 方正字体
        '2': 'Roboto, "Segoe UI", Arial, sans-serif',
        // 圆形元素风格 - 圆润字体
        '3': '"Varela Round", "Nunito", -apple-system, sans-serif',
        // 简约商务风格 - 商务字体
        '4': '"SF Pro Display", Arial, sans-serif',
        // 有机自然风格 - 自然字体
        '5': '"Comic Sans MS", "Nunito", -apple-system, sans-serif',
        // 未来科技风格 - 科技字体
        '6': '"Orbitron", "Rajdhani", Roboto, sans-serif',
        // 卡通可爱风格 - 可爱字体
        '7': '"Quicksand", "Comic Sans MS", -apple-system, sans-serif',
        // 古典优雅风格 - 经典字体
        '8': '"Times New Roman", Georgia, serif',
        // 极简设计风格 - 极简字体
        '9': '"Helvetica Neue", Arial, sans-serif',
        // 豪华质感风格 - 高端字体
        '10': '"Playfair Display", "Libre Baskerville", Georgia, serif'
    };
    
    // 应用字体
    if (fontFamilies[themeNumber]) {
        document.body.style.fontFamily = fontFamilies[themeNumber];
    }
    
    // 应用主题特定的布局调整
    applyThemeLayout(themeNumber);
}

// 应用主题特定的布局调整
function applyThemeLayout(themeNumber) {
    // 清除可能存在的布局类
    const layoutClasses = ['layout-standard', 'layout-grid', 'layout-spaced', 
                          'layout-compact', 'layout-flowing', 'layout-futuristic',
                          'layout-playful', 'layout-traditional', 'layout-minimalist',
                          'layout-luxury'];
    
    for (const cls of layoutClasses) {
        document.body.classList.remove(cls);
    }
    
    // 应用特定布局类
    const layoutMap = {
        '1': 'layout-standard',
        '2': 'layout-grid',
        '3': 'layout-spaced',
        '4': 'layout-compact',
        '5': 'layout-flowing',
        '6': 'layout-futuristic',
        '7': 'layout-playful',
        '8': 'layout-traditional',
        '9': 'layout-minimalist',
        '10': 'layout-luxury'
    };
    
    if (layoutMap[themeNumber]) {
        document.body.classList.add(layoutMap[themeNumber]);
    }
    
    // 特定主题的其他调整
    switch (themeNumber) {
        case '2': // 扁平科技风格
            adjustFlatTechLayout();
            break;
        case '6': // 未来科技风格
            adjustFuturisticLayout();
            break;
        case '7': // 卡通可爱风格
            adjustCuteLayout();
            break;
        case '10': // 豪华质感风格
            adjustLuxuryLayout();
            break;
    }
}

// 扁平科技风格的布局调整
function adjustFlatTechLayout() {
    // 为特定元素添加边框和直角风格
    const cards = document.querySelectorAll('.card, .agent-card');
    cards.forEach(card => {
        card.style.borderRadius = '0';
        card.style.transition = 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
}

// 未来科技风格的布局调整
function adjustFuturisticLayout() {
    // 添加发光效果
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(btn => {
        btn.style.boxShadow = '0 0 15px rgba(187, 134, 252, 0.5)';
    });
    
    // 修改导航栏
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    }
}

// 卡通可爱风格的布局调整
function adjustCuteLayout() {
    // 添加圆润效果
    const elements = document.querySelectorAll('.card, .agent-card, .btn, .input-group');
    elements.forEach(el => {
        el.style.borderRadius = '20px';
    });
}

// 豪华质感风格的布局调整
function adjustLuxuryLayout() {
    // 添加金色边框和渐变效果
    const cards = document.querySelectorAll('.card, .agent-card');
    cards.forEach(card => {
        card.style.border = '1px solid rgba(255, 193, 7, 0.3)';
        card.style.background = 'linear-gradient(to right, #FFFFFF, rgba(255, 249, 196, 0.4))';
    });
    
    // 修改按钮样式
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(btn => {
        btn.style.background = 'linear-gradient(to right, #FFC107, #FFD54F)';
        btn.style.boxShadow = '0 4px 10px rgba(255, 193, 7, 0.3)';
    });
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