// State management
let currentSymbol = '';
let currentPeriodType = 'Q';
let financialData = [];
let chartInstance = null;
let chatHistory = [];
let isAnalyzingImage = false;
let els = {}; 

// Initialization
function init() {
    try {
        console.log("FinaSight: Initializing App...");
        // DOM Elements - Re-select inside init for absolute safety
        els = {
        settingsBtn: document.getElementById('btnSettings'),
        settingsPanel: document.getElementById('settingsPanel'),
        closeSettingsBtn: document.getElementById('btnCloseSettings'),
        tokenInput: document.getElementById('tokenInput'),
        geminiKeyInput: document.getElementById('geminiKeyInput'),
        deepseekKeyInput: document.getElementById('deepseekKeyInput'),
        saveTokenBtn: document.getElementById('btnSaveToken'),
        tokenStatus: document.getElementById('tokenStatus'),
        HARDCODED_TOKEN: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoyMDc3MDg5NTA2LCJuYmYiOjE3NzcwODk1MDYsImNsaWVudF9pZCI6ImZpcmVhbnQud2ViIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIyNTAyZDMyMi0yNWM0LTQ3MjUtOGUyYS1hZTVmZjc2ZDYzMGYiLCJhdXRoX3RpbWUiOjE3NzcwODk0NzksImlkcCI6Imlkc3J2IiwibmFtZSI6ImduMTQ1MTNAZ21haWwuY29tIiwic2VjdXJpdHlfc3RhbXAiOiI0YmRlN2Y1MC01NzY2LTQ5ZjEtODQ5ZS02NWU4ZWRhYmJiN2EiLCJqdGkiOiI1NTdmM2EwMjQ1ZDNlMDU5NDQ5YTg3NDhkMGNhZWVkNiIsImFtciI6WyJwYXNzd29yZCJdfQ.SRaT4E0pgLhinp2LMxg5Nuizpx8owQWHVbZdxOLbYPwJcVyed6eL4FNMRoJ7bsOu3kehdaYEySZ2rUbcbtY-ghRMQ2XFPccVsUSbWJjIdD9gD1nnsD4HQcPOmFy0nxvWaJo_zW0UmyEm1KenJVjrXEJF5YvoeWVW6hEqx11lsk6oCzVdG9MFNZFMENUWbJcjy2V3zqQpJb5y_6_fKZGendH_T9dBHo_4cm5QozuDBGQTX7jeAYinYMDcJNMI8Ou26yevlCveXYkzIU5lxtSfN0DjUdWGdhqy0rn0P9yDRwT8qmyAeFE3ryCFpt0dFvOQbN_qPvM9nEQ_3b4sGeyirg',
        HARDCODED_DEEPSEEK: 'sk-67c521431f9c452b9194b2495375bcef',
        HARDCODED_GEMINI: 'AIzaSyB67mS2xQd1PuENOwiBiPpf4-3ZAvtMWM8',
        HARDCODED_GEMINI_2: 'sk-67c521431f9c452b9194b2495375bcef',
        HARDCODED_OPENAI: 'sk-67c521431f9c452b9194b2495375bcef',
        HARDCODED_OPENROUTER: 'sk-67c521431f9c452b9194b2495375bcef',
        HARDCODED_GROQ: 'sk-67c521431f9c452b9194b2495375bcef',
        HARDCODED_HF: 'sk-67c521431f9c452b9194b2495375bcef',
        HARDCODED_XAI: 'sk-67c521431f9c452b9194b2495375bcef',
        symbolSearch: document.getElementById('symbolSearch'),
        searchBtn: document.getElementById('btnSearch'),
        appContent: document.getElementById('appContent'),
        navTabs: document.querySelectorAll('.nav-tab'),
        tabPanes: document.querySelectorAll('.tab-pane'),
        bctcEmptyState: document.getElementById('bctcEmptyState'),
        loadingState: document.getElementById('loadingState'),
        dataContent: document.getElementById('dataContent'),
        recEmptyState: document.getElementById('recEmptyState'),
        recContent: document.getElementById('recContent'),
        companySymbol: document.getElementById('companySymbol'),
        companyName: document.getElementById('companyName'),
        periodToggles: document.querySelectorAll('.period-toggle'),
        periodLabels: document.querySelectorAll('.period-label'),
        valRevenue: document.getElementById('valRevenue'),
        groRevenue: document.getElementById('groRevenue'),
        valProfit: document.getElementById('valProfit'),
        groProfit: document.getElementById('groProfit'),
        valGrossMargin: document.getElementById('valGrossMargin'),
        valROE: document.getElementById('valROE'),
        mainChart: document.getElementById('mainChart'),
        tableHead: document.getElementById('tableHead'),
        tableBody: document.getElementById('tableBody'),
        aiScore: document.getElementById('aiScore'),
        aiVerdict: document.getElementById('aiVerdict'),
        aiHoldingPeriod: document.getElementById('aiHoldingPeriod'),
        aiPE: document.getElementById('aiPE'),
        aiSafety: document.getElementById('aiSafety'),
        aiReasoning: document.getElementById('aiReasoning'),
        scoreCircle: document.getElementById('scoreCircle'),
        btnSelectFile: document.getElementById('btnSelectFile'),
        fileInput: document.getElementById('fileInput'),
        uploadPrompt: document.getElementById('uploadPrompt'),
        previewArea: document.getElementById('previewArea'),
        previewContainer: document.getElementById('previewContainer'),
        btnAnalyzeImg: document.getElementById('btnAnalyzeImg'),
        btnCancelImg: document.getElementById('btnCancelImg'),
        aiAnalysisLoading: document.getElementById('aiAnalysisLoading'),
        aiAnalysisResult: document.getElementById('aiAnalysisResult'),
        aiAnalysisText: document.getElementById('aiAnalysisText'),
        chatMessages: document.getElementById('chatMessages'),
        chatInput: document.getElementById('chatInput'),
        btnSendChat: document.getElementById('btnSendChat'),
        promptBtns: document.querySelectorAll('.prompt-btn'),
        globalLoadingPulse: document.getElementById('globalLoadingPulse'),
        globalLoadingDot: document.getElementById('globalLoadingDot'),
        toastContainer: document.getElementById('toastContainer')
    };

    // Attach listeners with existence checks
    if (els.settingsBtn) els.settingsBtn.addEventListener('click', toggleSettings);
    if (els.closeSettingsBtn) els.closeSettingsBtn.addEventListener('click', toggleSettings);
    if (els.saveTokenBtn) els.saveTokenBtn.addEventListener('click', saveToken);
    if (els.searchBtn) els.searchBtn.addEventListener('click', handleSearch);
    if (els.symbolSearch) els.symbolSearch.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSearch(); });
    if (els.btnSendChat) els.btnSendChat.addEventListener('click', handleSendChat);
    if (els.chatInput) els.chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendChat(); } });
    if (els.promptBtns) els.promptBtns.forEach(btn => { btn.addEventListener('click', () => { els.chatInput.value = btn.textContent; handleSendChat(); }); });
    if (els.btnSelectFile) {
        els.btnSelectFile.addEventListener('click', () => els.fileInput.click());
        if (els.fileInput) els.fileInput.addEventListener('change', handleFileSelect);
        if (els.btnAnalyzeImg) els.btnAnalyzeImg.addEventListener('click', handleAnalyzeImage);
        if (els.btnCancelImg) els.btnCancelImg.addEventListener('click', resetAIUpload);
    }
    if (els.navTabs) {
        els.navTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                els.navTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const target = tab.dataset.target;
                els.tabPanes.forEach(pane => {
                    if (pane.id === target) { pane.classList.remove('hidden'); pane.classList.add('flex'); }
                    else { pane.classList.add('hidden'); pane.classList.remove('flex'); }
                });
                const chatInputArea = document.getElementById('chatInputArea');
                if (chatInputArea) {
                    if (target === 'tab-ask-ai') { chatInputArea.classList.remove('hidden'); chatInputArea.classList.add('flex'); }
                    else { chatInputArea.classList.add('hidden'); chatInputArea.classList.remove('flex'); }
                }
                localStorage.setItem('active_tab', target);
            });
        });
    }

    // Load saved data
    let savedToken = localStorage.getItem('fireant_token') || els.HARDCODED_TOKEN;
    localStorage.setItem('fireant_token', savedToken);
    if (els.tokenInput) els.tokenInput.value = savedToken;

    let savedGemini = localStorage.getItem('gemini_api_key') || els.HARDCODED_GEMINI;
    localStorage.setItem('gemini_api_key', savedGemini);
    if (els.geminiKeyInput) els.geminiKeyInput.value = savedGemini;

    let savedDeepSeek = localStorage.getItem('deepseek_api_key') || els.HARDCODED_DEEPSEEK;
    localStorage.setItem('deepseek_api_key', savedDeepSeek);
    if (els.deepseekKeyInput) els.deepseekKeyInput.value = savedDeepSeek;

    // Restore chat history
    const savedHistory = localStorage.getItem('saved_chat_history');
    const savedHtml = localStorage.getItem('saved_chat_html');
    if (savedHistory && savedHtml) {
        try {
            chatHistory = JSON.parse(savedHistory);
            if (els.chatMessages) {
                els.chatMessages.innerHTML = savedHtml;
                setTimeout(() => { els.chatMessages.scrollTop = els.chatMessages.scrollHeight; }, 100);
            }
        } catch (e) { console.error(e); }
    }

    // Restore BCTC Data
    const savedSymbol = localStorage.getItem('saved_symbol');
    const savedData = localStorage.getItem('saved_financial_data');
    if (savedSymbol && savedData) {
        try {
            currentSymbol = savedSymbol;
            currentPeriodType = localStorage.getItem('saved_period') || 'Q';
            financialData = JSON.parse(savedData);
            if (els.bctcEmptyState) els.bctcEmptyState.classList.add('hidden');
            if (els.recEmptyState) els.recEmptyState.classList.add('hidden');
            if (els.companySymbol) els.companySymbol.textContent = currentSymbol;
            if (els.companyName) els.companyName.textContent = `Báo cáo tài chính ${currentSymbol}`;
            if (els.periodLabels) els.periodLabels.forEach(el => el.textContent = currentPeriodType === 'Q' ? 'Quý' : 'Năm');
            if (els.periodToggles) {
                els.periodToggles.forEach(b => {
                    b.classList.remove('active');
                    if (b.dataset.type === currentPeriodType) b.classList.add('active');
                });
            }
            renderDashboard(financialData.slice(-5), financialData);
            const savedRecData = localStorage.getItem('saved_ai_rec_data');
            if (savedRecData) { renderAIRecommendationUI(JSON.parse(savedRecData)); }
            else { fetchAIRecommendation(currentSymbol, financialData[financialData.length - 1], financialData[financialData.length - 2]); }
            if (els.dataContent) els.dataContent.classList.remove('hidden');
            if (els.recContent) els.recContent.classList.remove('hidden');
        } catch(e) {}
    }

    // Restore Image Analysis Data
    const savedAnalysis = localStorage.getItem('saved_img_analysis_html');
    const savedPreview = localStorage.getItem('saved_img_preview_html');
    const savedFiles = localStorage.getItem('saved_img_files_data');
    if (savedAnalysis && savedPreview && savedFiles) {
        try {
            selectedFilesData = JSON.parse(savedFiles);
            if (els.previewContainer) els.previewContainer.innerHTML = savedPreview;
            if (els.aiAnalysisText) els.aiAnalysisText.innerHTML = savedAnalysis;
            if (els.uploadPrompt) els.uploadPrompt.classList.add('hidden');
            if (els.previewArea) {
                els.previewArea.classList.remove('hidden');
                els.previewArea.classList.add('flex');
            }
            if (els.aiAnalysisResult) els.aiAnalysisResult.classList.remove('hidden');
        } catch(e) {}
    }

    // Restore Active Tab
    const savedTab = localStorage.getItem('active_tab');
    if (savedTab) {
        const tabBtn = document.querySelector(`.nav-tab[data-target="${savedTab}"]`);
        if (tabBtn) tabBtn.click();
    }

    if (els.periodToggles) {
        els.periodToggles.forEach(btn => {
            btn.addEventListener('click', (e) => {
                els.periodToggles.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                currentPeriodType = e.target.dataset.type;
                if (currentSymbol) fetchData(currentSymbol, currentPeriodType);
            });
        });
    }

    if (window.Chart) {
        Chart.defaults.color = '#9CA3AF';
        Chart.defaults.font.family = 'Inter, sans-serif';
    }
    console.log("FinaSight: Initialization Complete.");
    } catch (e) {
        console.error("CRITICAL INIT ERROR:", e);
        alert("Lỗi khởi tạo hệ thống: " + e.message + "\n\nXin vui lòng làm mới trang (F5) hoặc xóa cache.");
    }
}

// UI Handlers
function toggleSettings() {
    els.settingsPanel.classList.toggle('hidden');
    els.tokenStatus.classList.add('hidden');
}

function saveToken() {
    const token = els.tokenInput.value.trim();
    const gemini = els.geminiKeyInput.value.trim();
    const deepseek = els.deepseekKeyInput.value.trim();
    
    if (token) {
        let finalToken = token;
        if (!token.toLowerCase().startsWith('bearer ')) {
            finalToken = 'Bearer ' + token;
            els.tokenInput.value = finalToken;
        }
        localStorage.setItem('fireant_token', finalToken);
    } else {
        localStorage.removeItem('fireant_token');
    }
    
    if (gemini) {
        localStorage.setItem('gemini_api_key', gemini);
    } else {
        localStorage.removeItem('gemini_api_key');
    }

    if (deepseek) {
        localStorage.setItem('deepseek_api_key', deepseek);
    } else {
        localStorage.removeItem('deepseek_api_key');
    }
    
    els.tokenStatus.textContent = 'Đã lưu Cấu Hình thành công!';
    els.tokenStatus.className = 'mt-3 text-xs text-center text-finance-up block';
    setTimeout(toggleSettings, 1500);
}

function handleSearch() {
    const symbol = els.symbolSearch.value.trim().toUpperCase();
    if (!symbol) return;
    
    const token = localStorage.getItem('fireant_token');
    if (!token) {
        alert("Vui lòng thiết lập Token trong phần Cài đặt trước khi tìm kiếm.");
        toggleSettings();
        return;
    }

    currentSymbol = symbol;
    fetchData(currentSymbol, currentPeriodType);
}

// Data Fetching & Processing
async function fetchData(symbol, type) {
    els.bctcEmptyState.classList.add('hidden');
    els.recEmptyState.classList.add('hidden');
    els.dataContent.classList.add('hidden');
    els.recContent.classList.add('hidden');
    els.loadingState.classList.remove('hidden');
    
    // Update UI headers
    els.companySymbol.textContent = symbol;
    // We don't have company name API yet, placeholder
    els.companyName.textContent = `Báo cáo tài chính ${symbol}`;
    
    els.periodLabels.forEach(el => el.textContent = type === 'Q' ? 'Quý' : 'Năm');

    const token = localStorage.getItem('fireant_token');
    const url = `https://restv2.fireant.vn/symbols/${symbol}/financial-data?type=${type}&count=6`; // Get 6 to calc growth of 5

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Token không hợp lệ hoặc đã hết hạn. Vui lòng cập nhật Token mới.");
            }
            throw new Error(`Lỗi dữ liệu: ${response.status}`);
        }

        const data = await response.json();
        if (!data || data.length === 0) {
            throw new Error("Không có dữ liệu cho mã này.");
        }

        // Data is usually returned latest first. Let's reverse it to chronological order for charts.
        financialData = data.reverse(); 
        
        // We asked for 6 to have baseline for YoY/QoQ growth of the first item, but we display the last 5
        const displayData = financialData.slice(-5);
        
        renderDashboard(displayData, financialData);
        
        // Fetch AI recommendation asynchronously
        fetchAIRecommendation(currentSymbol, financialData[financialData.length - 1], financialData[financialData.length - 2]).then(data => {
            if (data) {
                localStorage.setItem('saved_ai_rec_data', JSON.stringify(data));
            }
        });
        
        els.loadingState.classList.add('hidden');
        els.dataContent.classList.remove('hidden');
        els.recContent.classList.remove('hidden');
        
        // Save state to local storage
        localStorage.setItem('saved_symbol', currentSymbol);
        localStorage.setItem('saved_period', currentPeriodType);
        localStorage.setItem('saved_financial_data', JSON.stringify(financialData));
        
    } catch (error) {
        els.loadingState.classList.add('hidden');
        els.bctcEmptyState.classList.remove('hidden');
        els.recEmptyState.classList.remove('hidden');
        alert(error.message);
    }
}

// Formatters and Helpers
const formatBillion = (val) => {
    if (val === null || val === undefined || isNaN(val)) return '-';
    return (val / 1000000000).toLocaleString('vi-VN', { maximumFractionDigits: 1 });
};
const formatPercent = (val) => {
    if (val === null || val === undefined || isNaN(val)) return '-';
    return (val * 100).toFixed(1) + '%';
};

const getProp = (obj, propArr) => {
    for (let p of propArr) {
        if (obj[p] !== undefined && obj[p] !== null) return obj[p];
    }
    return undefined;
};

const getYear = (item) => getProp(item, ['Year', 'year']) || 'UNDEFINED';
const getQuarter = (item) => getProp(item, ['Quarter', 'quarter']) || 'UNDEFINED';
const getLabel = (item, type) => type === 'Q' ? `Q${getQuarter(item)}/${getYear(item)}` : `${getYear(item)}`;

// Rendering
function renderDashboard(data, allData) {
    if (data.length === 0) return;
    
    const latest = data[data.length - 1];
    const previous = data.length > 1 ? data[data.length - 2] : null;

    // Helper to get financial value from item
    const getFin = (item, keysArr) => {
        if (!item || !item.financialValues) return undefined;
        return getProp(item.financialValues, keysArr);
    };

    // 1. Highlight Cards
    let latestNetSales = getFin(latest, ['NetSale', 'NetSales']);
    let latestProfit = getFin(latest, ['ParentCompanyShareholderProfitAfterTax', 'ProfitAfterTax']);
    let latestGrossMargin = getFin(latest, ['GrossMargin']);
    let latestROE = getFin(latest, ['ROE']);

    els.valRevenue.textContent = formatBillion(latestNetSales) + ' tỷ';
    els.valProfit.textContent = formatBillion(latestProfit) + ' tỷ';
    if (els.valGrossMargin) els.valGrossMargin.textContent = formatPercent(latestGrossMargin);
    if (els.valROE) els.valROE.textContent = formatPercent(latestROE);


    // Calculate growth safely (QoQ or YoY depends on type)
    if (previous) {
        let prevNetSales = getFin(previous, ['NetSale', 'NetSales']);
        let prevProfit = getFin(previous, ['ParentCompanyShareholderProfitAfterTax', 'ProfitAfterTax']);

        const revGrowth = latestNetSales && prevNetSales ? ((latestNetSales - prevNetSales) / Math.abs(prevNetSales)) * 100 : 0;
        const proGrowth = latestProfit && prevProfit ? ((latestProfit - prevProfit) / Math.abs(prevProfit)) * 100 : 0;
        
        setGrowthLabel(els.groRevenue, revGrowth);
        setGrowthLabel(els.groProfit, proGrowth);
    } else {
        els.groRevenue.textContent = '-';
        els.groProfit.textContent = '-';
    }

    // 2. Main Chart
    renderChart(data);

    // 3. Table
    renderTable(data);
}

function setGrowthLabel(element, value) {
    if (value > 0) {
        element.innerHTML = `<i class="fa-solid fa-caret-up text-finance-up"></i> <span class="text-finance-up">${value.toFixed(1)}%</span> so với kỳ trước`;
    } else if (value < 0) {
        element.innerHTML = `<i class="fa-solid fa-caret-down text-finance-down"></i> <span class="text-finance-down">${Math.abs(value).toFixed(1)}%</span> so với kỳ trước`;
    } else {
        element.textContent = 'Không đổi';
    }
}

function renderChart(data) {
    const getFin = (item, keysArr) => item && item.financialValues ? getProp(item.financialValues, keysArr) : undefined;
    const labels = data.map(d => getLabel(d, currentPeriodType));
    const revenues = data.map(d => (getFin(d, ['NetSale', 'NetSales']) || 0) / 1000000000);
    const profits = data.map(d => (getFin(d, ['ParentCompanyShareholderProfitAfterTax', 'ProfitAfterTax']) || 0) / 1000000000);

    if (chartInstance) {
        chartInstance.destroy();
    }

    const ctx = els.mainChart.getContext('2d');
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Doanh thu thuần',
                    data: revenues,
                    backgroundColor: 'rgba(51, 51, 51, 0.8)',
                    borderRadius: 4,
                    order: 2
                },
                {
                    label: 'LN Sau Thuế',
                    data: profits,
                    type: 'line',
                    borderColor: '#00F0FF',
                    backgroundColor: '#00F0FF',
                    borderWidth: 2,
                    pointBackgroundColor: '#1E1E1E',
                    pointBorderColor: '#00F0FF',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    tension: 0.3,
                    order: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: { boxWidth: 10, usePointStyle: true }
                },
                tooltip: {
                    backgroundColor: 'rgba(30,30,30,0.9)',
                    titleColor: '#fff',
                    bodyColor: '#ccc',
                    borderColor: '#333',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('vi-VN').format(context.parsed.y) + ' tỷ';
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false, drawBorder: false }
                },
                y: {
                    grid: { color: '#333333', borderDash: [3, 3] },
                    ticks: {
                        callback: function(value) { return value; }
                    }
                }
            }
        }
    });
}

function renderTable(data) {
    // Setup Headers
    let headHtml = '<th class="sticky-col px-4 py-3 font-medium">Chỉ tiêu (Tỷ VNĐ)</th>';
    data.forEach(d => {
        headHtml += `<th class="px-4 py-3 font-medium text-right">${getLabel(d, currentPeriodType)}</th>`;
    });
    els.tableHead.innerHTML = headHtml;

    // Define metrics to show
    const metrics = [
        { keys: ['NetSale', 'NetSales'], name: 'Doanh thu thuần', type: 'money' },
        { keys: ['GrossProfit'], name: 'Lợi nhuận gộp', type: 'money' },
        { keys: ['ParentCompanyShareholderProfitAfterTax', 'ProfitAfterTax'], name: 'LNST Cổ đông công ty mẹ', type: 'money' },
        { keys: ['TotalAsset'], name: 'Tổng tài sản', type: 'money' },
        { keys: ['StockHolderEquity', 'Equity'], name: 'Vốn chủ sở hữu', type: 'money' },
        { keys: ['GrossMargin'], name: 'Biên lợi nhuận gộp', type: 'percent' },
        { keys: ['ROE'], name: 'ROE', type: 'percent' }
    ];

    let bodyHtml = '';
    metrics.forEach(m => {
        bodyHtml += `<tr class="hover:bg-dark-bg/50 transition">`;
        bodyHtml += `<td class="sticky-col px-4 py-3 text-white">${m.name}</td>`;
        data.forEach(d => {
            let val = d && d.financialValues ? getProp(d.financialValues, m.keys) : undefined;
            let formatted = '-';
            if (val !== null && val !== undefined && !isNaN(val)) {
                formatted = m.type === 'money' ? formatBillion(val) : formatPercent(val);
            }
            bodyHtml += `<td class="px-4 py-3 text-right">${formatted}</td>`;
        });
        bodyHtml += `</tr>`;
    });

    els.tableBody.innerHTML = bodyHtml;
}

// -----------------------------------------------------
// AI RECOMMENDATION LOGIC
// -----------------------------------------------------
// -----------------------------------------------------
// AI RECOMMENDATION LOGIC (REAL-TIME GENERATIVE AI)
// -----------------------------------------------------
async function fetchAIRecommendation(symbol, latest, previous) {
    els.aiVerdict.textContent = "Đang phân tích thời gian thực...";
    els.aiVerdict.className = "text-lg font-bold text-gray-400 leading-tight animate-pulse";
    els.scoreCircle.setAttribute('stroke', '#374151');
    els.aiScore.textContent = "...";
    els.aiHoldingPeriod.textContent = "---";
    els.aiPE.textContent = "---";
    els.aiSafety.textContent = "---";
    els.aiReasoning.innerHTML = '<li class="text-gray-400 animate-pulse">AI đang phân tích báo cáo và vĩ mô...</li>';

    const apiKey = localStorage.getItem('gemini_api_key') || els.HARDCODED_GEMINI;
    if (!apiKey) {
        renderAIError("Vui lòng nhập Gemini API Key trong Cài đặt");
        return null;
    }

    const getFin = (item, keysArr) => item && item.financialValues ? getProp(item.financialValues, keysArr) : undefined;
    
    let lPro = getFin(latest, ['ParentCompanyShareholderProfitAfterTax', 'ProfitAfterTax']) || 0;
    let pPro = getFin(previous, ['ParentCompanyShareholderProfitAfterTax', 'ProfitAfterTax']) || 0;
    let roe = getFin(latest, ['ROE']) || 0;
    let pe = latest.PE || getFin(latest, ['PE']) || 0;
    let grossMargin = getFin(latest, ['GrossMargin']) || 0;

    const today = new Date();
    const dateString = today.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const prompt = `Bạn là một chuyên gia tài chính AI. Hôm nay là ${dateString}.
Hãy phân tích mã cổ phiếu ${symbol} dựa trên các thông số BCTC gần nhất:
- Tăng trưởng LNST: từ ${formatBillion(pPro)} tỷ lên ${formatBillion(lPro)} tỷ.
- Hiệu suất ROE: ${(roe*100).toFixed(1)}%
- Định giá P/E: ${pe.toFixed(1)}
- Biên lợi nhuận gộp: ${(grossMargin*100).toFixed(1)}%

Trách nhiệm của bạn: Đánh giá xem với tình hình vĩ mô HIỆN TẠI của Việt Nam và thế giới, các chỉ số này của ${symbol} là Tốt hay Xấu.
Bạn PHẢI trả về ĐÚNG DUY NHẤT 1 ĐOẠN JSON CHUẨN (không bọc trong markdown, không có text dư thừa nào), có cấu trúc sau:
{
  "score": <Số nguyên 0 đến 100>,
  "verdict": "<TÍCH CỰC MUA VÀO / NẮM GIỮ / ĐỨNG NGOÀI>",
  "holdingPeriod": "<Ví dụ: Ngắn hạn (3-6 tháng)>",
  "peValuation": "<Đắt / Hợp lý / Rẻ>",
  "safetyMargin": "<Cao / Trung bình / Thấp>",
  "reasons": [
    { "type": "up", "text": "Lý do tích cực 1" },
    { "type": "down", "text": "Lý do tiêu cực 1" }
  ]
}
Chú ý: field "type" chỉ được phép là "up" (tích cực), "down" (tiêu cực) hoặc "neutral" (trung lập). Trả về JSON hợp lệ.`;

    const deepseekApiKey = localStorage.getItem('deepseek_api_key') || els.HARDCODED_DEEPSEEK;
    if (!deepseekApiKey) {
        renderAIError("Vui lòng nhập DeepSeek API Key!");
        return null;
    }

    let jsonString = "";
    let lastError = "";
    try {
        jsonString = await callDeepSeekDirect(deepseekApiKey, prompt);
    } catch (e) {
        lastError = e.message;
        console.warn(`DeepSeek failed:`, e);
    }

    if (!jsonString) {
        renderAIError("Lỗi: " + lastError || "Không thể kết nối đến bất kỳ hệ thống AI nào.");
        return null;
    }

    try {
        // Clean JSON string in case it has markdown block
        jsonString = jsonString.replace(/```json/gi, '').replace(/```/g, '').trim();
        const data = JSON.parse(jsonString);
        renderAIRecommendationUI(data);
        return data;
    } catch (e) {
        renderAIError("Lỗi phân giải dữ liệu AI. Vui lòng thử lại.");
        console.error("JSON Error:", e, "Raw output:", jsonString);
        return null;
    }
}

async function callDeepSeekDirect(apiKey, prompt) {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [{ role: 'user', content: prompt }]
        })
    });
    if (!response.ok) throw new Error("DeepSeek API error");
    const result = await response.json();
    return result.choices[0].message.content;
}

function renderAIError(msg) {
    els.aiVerdict.textContent = "Lỗi Phân Tích";
    els.aiVerdict.className = "text-lg font-bold text-red-500 leading-tight";
    els.scoreCircle.setAttribute('stroke', '#EF4444');
    els.aiScore.textContent = "!";
    els.aiReasoning.innerHTML = `<li class="text-red-400"><i class="fa-solid fa-triangle-exclamation mr-2"></i>${msg}</li>`;
}

function renderAIRecommendationUI(data) {
    const score = parseInt(data.score) || 0;
    els.aiScore.textContent = score;

    let verdictClass = 'text-gray-400';
    let strokeColor = '#9CA3AF';

    if (score >= 70) {
        verdictClass = 'text-brand';
        strokeColor = '#00F0FF';
    } else if (score >= 40) {
        verdictClass = 'text-yellow-400';
        strokeColor = '#FBBF24';
    } else {
        verdictClass = 'text-red-500';
        strokeColor = '#EF4444';
    }

    els.aiVerdict.textContent = data.verdict || "Không xác định";
    els.aiVerdict.className = `text-lg font-bold mt-1 ${verdictClass} leading-tight`;
    els.scoreCircle.setAttribute('stroke', strokeColor);
    
    // Animate score circle
    els.scoreCircle.style.strokeDasharray = `${score}, 100`;

    els.aiHoldingPeriod.textContent = data.holdingPeriod || "---";
    els.aiPE.textContent = data.peValuation || "---";
    els.aiSafety.textContent = data.safetyMargin || "---";

    let reasonsHtml = '';
    if (data.reasons && Array.isArray(data.reasons)) {
        data.reasons.forEach(r => {
            let icon = '<i class="fa-solid fa-minus-circle text-gray-400 mr-2"></i>';
            let tClass = 'text-white';
            
            if (r.type === 'up') {
                icon = '<i class="fa-solid fa-check-circle text-finance-up mr-2"></i>';
                tClass = 'text-finance-up';
            } else if (r.type === 'down') {
                icon = '<i class="fa-solid fa-times-circle text-finance-down mr-2"></i>';
                tClass = 'text-finance-down';
            }
            
            reasonsHtml += `<li class="${tClass}">${icon} ${r.text}</li>`;
        });
    }
    els.aiReasoning.innerHTML = reasonsHtml;
}

// -----------------------------------------------------
// AI IMAGE ANALYSIS (GEMINI)
// -----------------------------------------------------
let selectedFilesData = [];

function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    selectedFilesData = [];
    if (els.previewContainer) els.previewContainer.innerHTML = '';

    let loadedCount = 0;
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const base64 = event.target.result.split(',')[1];
            const mimeType = file.type || "application/octet-stream";
            const isPdf = mimeType === "application/pdf";
            
            selectedFilesData.push({
                base64: base64,
                mimeType: mimeType
            });
            
            if (els.previewContainer) {
                if (isPdf) {
                    els.previewContainer.innerHTML += `
                        <div class="flex flex-col items-center justify-center bg-[#333333] rounded-lg p-3 w-24 h-24 border border-dark-border">
                            <i class="fa-solid fa-file-pdf text-3xl text-red-500 mb-2"></i>
                            <span class="text-[10px] text-gray-300 truncate w-full text-center" title="${file.name}">${file.name}</span>
                        </div>
                    `;
                } else {
                    els.previewContainer.innerHTML += `
                        <img src="${event.target.result}" class="h-24 w-24 object-cover rounded-lg shadow-md border border-dark-border">
                    `;
                }
            }

            loadedCount++;
            if (loadedCount === files.length) {
                els.uploadPrompt.classList.add('hidden');
                els.previewArea.classList.remove('hidden');
                els.previewArea.classList.add('flex');
            }
        };
        reader.readAsDataURL(file);
    });
}

function resetAIUpload() {
    selectedFilesData = [];
    els.fileInput.value = '';
    els.uploadPrompt.classList.remove('hidden');
    els.previewArea.classList.add('hidden');
    els.previewArea.classList.remove('flex');
    if (els.previewContainer) els.previewContainer.innerHTML = '';
    els.aiAnalysisResult.classList.add('hidden');
    
    // Clear saved image state
    localStorage.removeItem('saved_img_analysis_html');
    localStorage.removeItem('saved_img_preview_html');
    localStorage.removeItem('saved_img_files_data');
}

async function handleAnalyzeImage() {
    const apiKey = localStorage.getItem('gemini_api_key') || els.HARDCODED_GEMINI;
    if (!apiKey) {
        alert("Vui lòng nhập Gemini API Key trong phần Cài đặt!");
        toggleSettings();
        return;
    }

    if (selectedFilesData.length === 0) return;

    els.previewArea.classList.add('hidden');
    els.previewArea.classList.remove('flex');
    els.aiAnalysisLoading.classList.remove('hidden');
    els.aiAnalysisResult.classList.add('hidden');

    // Global loading on
    isAnalyzingImage = true;
    if (els.globalLoadingPulse) els.globalLoadingPulse.classList.remove('hidden');
    if (els.globalLoadingDot) els.globalLoadingDot.classList.remove('hidden');

    try {
        const response = await callGeminiAI(apiKey, selectedFilesData);
        displayAIAnalysis(response);
        
        // If user is not on the education tab, show a toast
        const currentTab = document.querySelector('.nav-tab.active').dataset.target;
        if (currentTab !== 'tab-ai-edu') {
            showToast("✨ Phân tích hoàn tất!", "Click để xem kết quả phân tích tài liệu.", () => {
                const eduTab = document.querySelector('[data-target="tab-ai-edu"]');
                if (eduTab) eduTab.click();
            });
        }
    } catch (error) {
        showToast("❌ Lỗi phân tích", error.message);
        els.previewArea.classList.remove('hidden');
        els.previewArea.classList.add('flex');
    } finally {
        isAnalyzingImage = false;
        els.aiAnalysisLoading.classList.add('hidden');
        if (els.globalLoadingPulse) els.globalLoadingPulse.classList.add('hidden');
        if (els.globalLoadingDot) els.globalLoadingDot.classList.add('hidden');
    }
}

function showToast(title, msg, callback = null) {
    if (!els.toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = "bg-dark-card border border-brand/30 shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-2xl p-4 flex items-center gap-4 pointer-events-auto animate-fade-in translate-y-0 transition-all cursor-pointer active:scale-95";
    toast.innerHTML = `
        <div class="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center shrink-0">
            <i class="fa-solid fa-bell text-brand"></i>
        </div>
        <div class="flex-1">
            <h4 class="text-[11px] font-bold text-white">${title}</h4>
            <p class="text-[9px] text-gray-400 mt-0.5">${msg}</p>
        </div>
        <i class="fa-solid fa-chevron-right text-gray-600 text-xs"></i>
    `;
    
    if (callback) toast.onclick = () => {
        callback();
        toast.remove();
    };
    else toast.onclick = () => toast.remove();
    
    els.toastContainer.appendChild(toast);
    
    // Auto remove after 5s
    setTimeout(() => {
        if (toast.parentElement) {
            toast.classList.add('opacity-0', '-translate-y-4');
            setTimeout(() => toast.remove(), 300);
        }
    }, 5000);
}

async function callGeminiAI(apiKey, filesData) {
    const today = new Date();
    const dateString = today.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    const prompt = `Bạn là một chuyên gia phân tích tài chính cao cấp tại Việt Nam. Hôm nay là ${dateString}. 
Hãy đọc tài liệu/hình ảnh báo cáo tài chính này và thực hiện các yêu cầu sau để giúp tôi học hỏi:
1. Giải thích ý nghĩa của các con số quan trọng trong tài liệu.
2. Chỉ ra các "Dấu hiệu rủi ro" tiềm ẩn hoặc "Điểm sáng" tích cực.
3. Phân tích cơ hội đầu tư dựa trên dữ liệu này.
4. Đưa ra 1 bài học kinh nghiệm ngắn gọn.

Hãy trình bày bằng tiếng Việt, chia các mục rõ ràng bằng tiêu đề và gạch đầu dòng.`;

    const contents = [{
        parts: [
            { text: prompt },
            ...filesData.map(file => ({
                inlineData: {
                    mimeType: file.mimeType,
                    data: file.base64
                }
            }))
        ]
    }];

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: contents })
    });

    if (!response.ok) throw new Error("Lỗi API Gemini");
    const result = await response.json();
    return result.candidates[0].content.parts[0].text;
}

async function callOpenAIChat(history) {
    const today = new Date();
    const dateString = today.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const systemInstruction = `Bạn là Cố vấn Tài chính AI hàng đầu Việt Nam. Hôm nay là ${dateString}. 
Mục tiêu của bạn là giúp người dùng cá nhân đưa ra quyết định đầu tư chứng khoán chính xác dựa trên tình hình thực tế hiện tại.

HƯỚNG DẪN QUAN TRỌNG:
1. Khi người dùng yêu cầu "Gợi ý mã cổ phiếu":
   - Bạn PHẢI tự động đánh giá tình hình vĩ mô thế giới & Việt Nam hiện tại.
   - Dựa vào đó, chọn ra các nhóm ngành hưởng lợi (vi mô).
   - Sau đó gợi ý cụ thể 2-3 mã cổ phiếu tốt nhất.
   - Nêu rõ vùng giá mua, vùng giá chốt lời, và thời điểm nắm giữ (ngắn/trung/dài hạn).
   - Tóm tắt ý chính bằng các gạch đầu dòng ngắn gọn, dễ hiểu.
2. Nếu người dùng hỏi về "Mã đang xem": Hãy sử dụng dữ liệu [Bối cảnh hệ thống] được đính kèm ngầm trong câu hỏi để trả lời định giá, cơ hội, rủi ro cụ thể cho mã đó.
3. Luôn cảnh báo rủi ro ngắn gọn ở cuối: "Lưu ý: Mọi tư vấn chỉ mang tính tham khảo...".

Trình bày bằng tiếng Việt, thân thiện, súc tích, dùng Markdown (in đậm, danh sách) để làm nổi bật thông tin.`;

    const messages = [{ role: 'system', content: systemInstruction }];
    history.forEach(item => {
        messages.push({
            role: item.role === 'model' ? 'assistant' : 'user',
            content: item.parts[0].text
        });
    });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${els.HARDCODED_OPENAI}`
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: messages
        })
    });

    if (!response.ok) throw new Error("OpenAI API Error");
    const data = await response.json();
    return data.choices[0].message.content;
}

async function callGroqChat(history) {
    const today = new Date();
    const dateString = today.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const systemInstruction = `Bạn là Cố vấn Tài chính AI hàng đầu Việt Nam. Hôm nay là ${dateString}. 
Mục tiêu của bạn là giúp người dùng cá nhân đưa ra quyết định đầu tư chứng khoán chính xác dựa trên tình hình thực tế hiện tại.

HƯỚNG DẪN QUAN TRỌNG:
1. Khi người dùng yêu cầu "Gợi ý mã cổ phiếu":
   - Bạn PHẢI tự động đánh giá tình hình vĩ mô thế giới & Việt Nam hiện tại.
   - Dựa vào đó, chọn ra các nhóm ngành hưởng lợi (vi mô).
   - Sau đó gợi ý cụ thể 2-3 mã cổ phiếu tốt nhất.
   - Nêu rõ vùng giá mua, vùng giá chốt lời, và thời điểm nắm giữ (ngắn/trung/dài hạn).
   - Tóm tắt ý chính bằng các gạch đầu dòng ngắn gọn, dễ hiểu.
2. Nếu người dùng hỏi về "Mã đang xem": Hãy sử dụng dữ liệu [Bối cảnh hệ thống] được đính kèm ngầm trong câu hỏi để trả lời định giá, cơ hội, rủi ro cụ thể cho mã đó.
3. Luôn cảnh báo rủi ro ngắn gọn ở cuối: "Lưu ý: Mọi tư vấn chỉ mang tính tham khảo...".

Trình bày bằng tiếng Việt, thân thiện, súc tích, dùng Markdown (in đậm, danh sách) để làm nổi bật thông tin.`;

    const messages = [{ role: 'system', content: systemInstruction }];
    history.forEach(item => {
        messages.push({
            role: item.role === 'model' ? 'assistant' : 'user',
            content: item.parts[0].text
        });
    });

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${els.HARDCODED_GROQ}`
        },
        body: JSON.stringify({
            model: 'llama3-70b-8192',
            messages: messages
        })
    });

    if (!response.ok) throw new Error("Groq API Error");
    const data = await response.json();
    return data.choices[0].message.content;
}

async function callHFChat(history) {
    const today = new Date();
    const dateString = today.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const systemInstruction = `Bạn là Cố vấn Tài chính AI hàng đầu Việt Nam. Hôm nay là ${dateString}. 
Mục tiêu của bạn là giúp người dùng cá nhân đưa ra quyết định đầu tư chứng khoán chính xác dựa trên tình hình thực tế hiện tại. Trình bày bằng tiếng Việt, Markdown.`;

    const messages = [{ role: 'system', content: systemInstruction }];
    history.forEach(item => {
        messages.push({
            role: item.role === 'model' ? 'assistant' : 'user',
            content: item.parts[0].text
        });
    });

    const response = await fetch('https://api-inference.huggingface.co/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${els.HARDCODED_HF}`
        },
        body: JSON.stringify({
            model: 'meta-llama/Meta-Llama-3-70B-Instruct',
            messages: messages,
            max_tokens: 2048
        })
    });

    if (!response.ok) throw new Error("HF API Error");
    const data = await response.json();
    return data.choices[0].message.content;
}

function displayAIAnalysis(text) {
    // Simple markdown to HTML converter for basic formatting
    const formatted = text
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
        .replace(/\n\s*-\s*(.*)/g, '<li class="ml-4 list-disc mt-1">$1</li>')
        .replace(/\n\d\.\s*(.*)/g, '<div class="mt-4 font-bold text-brand">$1</div>')
        .split('\n').join('<br>');

    els.aiAnalysisText.innerHTML = formatted;
    els.aiAnalysisResult.classList.remove('hidden');
    
    // Save image state
    localStorage.setItem('saved_img_analysis_html', els.aiAnalysisText.innerHTML);
    localStorage.setItem('saved_img_preview_html', els.previewContainer.innerHTML);
    localStorage.setItem('saved_img_files_data', JSON.stringify(selectedFilesData));
    
    // Smooth scroll to result
    els.aiAnalysisResult.scrollIntoView({ behavior: 'smooth' });
}

// -----------------------------------------------------
// CHATBOT LOGIC (HỎI AI)
// -----------------------------------------------------

function saveChatState() {
    localStorage.setItem('saved_chat_history', JSON.stringify(chatHistory));
    localStorage.setItem('saved_chat_html', els.chatMessages.innerHTML);
}

function appendMessage(role, text) {
    const isUser = role === 'user';
    
    // Convert markdown to simple HTML for AI responses
    let htmlText = text;
    if (!isUser) {
        htmlText = text
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n\s*-\s*(.*)/g, '<li class="ml-4 list-disc mt-1">$1</li>')
            .replace(/\n\d\.\s*(.*)/g, '<div class="mt-4 font-bold text-purple-400">$1</div>')
            .split('\n').join('<br>');
    }

    const msgDiv = document.createElement('div');
    msgDiv.className = `flex gap-3 ${isUser ? 'flex-row-reverse' : ''} animate-fade-in`;
    
    msgDiv.innerHTML = `
        <div class="w-8 h-8 rounded-full ${isUser ? 'bg-brand/20 border-brand/30' : 'bg-purple-500/20 border-purple-500/30'} flex items-center justify-center shrink-0 border">
            <i class="fa-solid ${isUser ? 'fa-user text-brand' : 'fa-robot text-purple-400'} text-sm"></i>
        </div>
        <div class="${isUser ? 'bg-brand text-black rounded-tr-none' : 'bg-dark-bg border border-dark-border text-gray-200 rounded-tl-none'} rounded-2xl p-3 max-w-[85%] text-sm">
            ${htmlText}
        </div>
    `;
    
    els.chatMessages.appendChild(msgDiv);
    els.chatMessages.scrollTop = els.chatMessages.scrollHeight;
}

function appendLoading() {
    const msgDiv = document.createElement('div');
    msgDiv.id = 'chatLoadingIndicator';
    msgDiv.className = `flex gap-3 animate-fade-in`;
    msgDiv.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 border border-purple-500/30">
            <i class="fa-solid fa-robot text-purple-400 text-sm"></i>
        </div>
        <div class="bg-dark-bg border border-dark-border rounded-2xl rounded-tl-none p-3 max-w-[85%] text-sm flex items-center gap-2">
            <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
            <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
        </div>
    `;
    els.chatMessages.appendChild(msgDiv);
    els.chatMessages.scrollTop = els.chatMessages.scrollHeight;
}

function removeLoading() {
    const loading = document.getElementById('chatLoadingIndicator');
    if (loading) loading.remove();
}
async function handleSendChat() {
    const apiKey = localStorage.getItem('deepseek_api_key') || els.HARDCODED_DEEPSEEK;
    if (!apiKey) {
        alert("Vui lòng nhập DeepSeek API Key!");
        toggleSettings();
        return;
    }

    const text = els.chatInput.value.trim();
    if (!text) return;

    // Add user message to UI and history
    appendMessage('user', text);
    els.chatInput.value = '';
    
    // Add context if available
    let contextStr = "";
    if (currentSymbol && financialData.length > 0) {
        const latest = financialData[financialData.length - 1];
        const getFin = (item, keysArr) => item && item.financialValues ? getProp(item.financialValues, keysArr) : undefined;
        
        contextStr = `\n[Bối cảnh hệ thống: Người dùng đang xem mã ${currentSymbol}. 
Dữ liệu gần nhất: Doanh thu = ${formatBillion(getFin(latest, ['NetSale', 'NetSales']))} tỷ, 
LNST = ${formatBillion(getFin(latest, ['ParentCompanyShareholderProfitAfterTax', 'ProfitAfterTax']))} tỷ, 
ROE = ${formatPercent(getFin(latest, ['ROE']))}, P/E = ${latest.PE || getFin(latest, ['PE']) || 'N/A'}]`;
    }

    const today = new Date();
    const dateString = today.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const timeString = today.toLocaleTimeString('vi-VN');

    chatHistory.push({
        role: "user",
        parts: [{ text: `[Thông tin hệ thống: Hôm nay là ${dateString}, ${timeString}]\n\n${text}${contextStr}` }]
    });

    appendLoading();

    let responseText = "";
    let providerName = "DeepSeek";
    try {
        responseText = await callDeepSeekChat(apiKey, chatHistory);
    } catch (e) {
        console.warn(`DeepSeek failed:`, e);
    }

    removeLoading();

    if (responseText) {
        const note = providerName === 'Gemini 1' ? "" : `\n\n*(Phản hồi bằng ${providerName} dự phòng)*`;
        appendMessage('model', responseText + note);
        chatHistory.push({ role: "model", parts: [{ text: responseText }] });
        saveChatState();
    } else {
        appendMessage('model', "Toàn bộ hệ thống AI đang quá tải. Vui lòng thử lại sau 30 giây.");
        chatHistory.pop();
        saveChatState();
    }
}

async function callDeepSeekChat(apiKey, history) {
    const today = new Date();
    const dateString = today.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const systemInstruction = `Bạn là Cố vấn Tài chính AI hàng đầu Việt Nam. Hôm nay là ${dateString}. 
Mục tiêu của bạn là giúp người dùng cá nhân đưa ra quyết định đầu tư chứng khoán chính xác dựa trên tình hình thực tế hiện tại.

HƯỚNG DẪN QUAN TRỌNG:
1. Khi người dùng yêu cầu "Gợi ý mã cổ phiếu":
   - Bạn PHẢI tự động đánh giá tình hình vĩ mô thế giới & Việt Nam hiện tại.
   - Dựa vào đó, chọn ra các nhóm ngành hưởng lợi (vi mô).
   - Sau đó gợi ý cụ thể 2-3 mã cổ phiếu tốt nhất.
   - Nêu rõ vùng giá mua, vùng giá chốt lời, và thời điểm nắm giữ (ngắn/trung/dài hạn).
   - Tóm tắt ý chính bằng các gạch đầu dòng ngắn gọn, dễ hiểu.
2. Nếu người dùng hỏi về "Mã đang xem": Hãy sử dụng dữ liệu [Bối cảnh hệ thống] được đính kèm ngầm trong câu hỏi của người dùng để trả lời định giá, cơ hội, rủi ro cụ thể cho mã đó.
3. Luôn cảnh báo rủi ro ngắn gọn ở cuối: "Lưu ý: Mọi tư vấn chỉ mang tính tham khảo...".

Trình bày bằng tiếng Việt, thân thiện, súc tích, dùng Markdown (in đậm, danh sách) để làm nổi bật thông tin.`;

    const messages = [{ role: 'system', content: systemInstruction }];
    history.forEach(item => {
        messages.push({
            role: item.role === 'model' ? 'assistant' : 'user',
            content: item.parts ? item.parts[0].text : item.content
        });
    });

    const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'deepseek-chat',
            messages: messages
        })
    });

    if (!response.ok) throw new Error("Lỗi API DeepSeek");
    const data = await response.json();
    return data.choices[0].message.content;
}

// Run app
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function clearAllAppData() {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử chat, cài đặt và dữ liệu đã lưu không? Hành động này không thể hoàn tác.")) {
        localStorage.clear();
        location.reload();
    }
}
