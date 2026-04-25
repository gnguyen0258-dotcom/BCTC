// State management
let currentSymbol = '';
let currentPeriodType = 'Q'; // 'Q' for Quarter, 'Y' for Year
let financialData = [];
let chartInstance = null;

    // DOM Elements
const els = {
    settingsBtn: document.getElementById('btnSettings'),
    settingsPanel: document.getElementById('settingsPanel'),
    closeSettingsBtn: document.getElementById('btnCloseSettings'),
    tokenInput: document.getElementById('tokenInput'),
    geminiKeyInput: document.getElementById('geminiKeyInput'),
    saveTokenBtn: document.getElementById('btnSaveToken'),
    tokenStatus: document.getElementById('tokenStatus'),
    
    // HARDCODED KEYS
    HARDCODED_TOKEN: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoyMDc3MDg5NTA2LCJuYmYiOjE3NzcwODk1MDYsImNsaWVudF9pZCI6ImZpcmVhbnQud2ViIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIyNTAyZDMyMi0yNWM0LTQ3MjUtOGUyYS1hZTVmZjc2ZDYzMGYiLCJhdXRoX3RpbWUiOjE3NzcwODk0NzksImlkcCI6Imlkc3J2IiwibmFtZSI6ImduMTQ1MTNAZ21haWwuY29tIiwic2VjdXJpdHlfc3RhbXAiOiI0YmRlN2Y1MC01NzY2LTQ5ZjEtODQ5ZS02NWU4ZWRhYmJiN2EiLCJqdGkiOiI1NTdmM2EwMjQ1ZDNlMDU5NDQ5YTg3NDhkMGNhZWVkNiIsImFtciI6WyJwYXNzd29yZCJdfQ.SRaT4E0pgLhinp2LMxg5Nuizpx8owQWHVbZdxOLbYPwJcVyed6eL4FNMRoJ7bsOu3kehdaYEySZ2rUbcbtY-ghRMQ2XFPccVsUSbWJjIdD9gD1nnsD4HQcPOmFy0nxvWaJo_zW0UmyEm1KenJVjrXEJF5YvoeWVW6hEqx11lsk6oCzVdG9MFNZFMENUWbJcjy2V3zqQpJb5y_6_fKZGendH_T9dBHo_4cm5QozuDBGQTX7jeAYinYMDcJNMI8Ou26yevlCveXYkzIU5lxtSfN0DjUdWGdhqy0rn0P9yDRwT8qmyAeFE3ryCFpt0dFvOQbN_qPvM9nEQ_3b4sGeyirg',
    HARDCODED_GEMINI: 'AIzaSyCxD787afacyFKnuCFzk8KQASNtG_z-ZMo',
    
    symbolSearch: document.getElementById('symbolSearch'),
    searchBtn: document.getElementById('btnSearch'),
    
    appContent: document.getElementById('appContent'),
    navTabs: document.querySelectorAll('.nav-tab'),
    tabPanes: document.querySelectorAll('.tab-pane'),

    // Welcome / Empty States
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

    // AI Education elements
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

    // Chatbot elements
    chatMessages: document.getElementById('chatMessages'),
    chatInput: document.getElementById('chatInput'),
    btnSendChat: document.getElementById('btnSendChat'),
    promptBtns: document.querySelectorAll('.prompt-btn')
};

// Chat history state
let chatHistory = [];

// Initialization
function init() {
    // Load saved token or use hardcoded
    let savedToken = localStorage.getItem('fireant_token');
    if (!savedToken) {
        savedToken = els.HARDCODED_TOKEN;
        localStorage.setItem('fireant_token', savedToken);
    }
    els.tokenInput.value = savedToken;

    let savedGemini = localStorage.getItem('gemini_api_key');
    // Force update if the saved key is empty OR if it matches the old leaked key
    if (!savedGemini || savedGemini === 'AIzaSyCE6F1L5ts0TZ3PHhU95SM-dDeotHbUzT8') {
        savedGemini = els.HARDCODED_GEMINI;
        localStorage.setItem('gemini_api_key', savedGemini);
    }
    els.geminiKeyInput.value = savedGemini;

    // Event Listeners
    els.settingsBtn.addEventListener('click', toggleSettings);
    els.closeSettingsBtn.addEventListener('click', toggleSettings);
    els.saveTokenBtn.addEventListener('click', saveToken);
    
    els.searchBtn.addEventListener('click', handleSearch);
    els.symbolSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    // Chatbot Event Listeners
    els.btnSendChat.addEventListener('click', handleSendChat);
    els.chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendChat();
        }
    });
    els.promptBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            els.chatInput.value = btn.textContent;
            handleSendChat();
        });
    });

    // Image Analysis Event Listeners
    if (els.btnSelectFile) {
        els.btnSelectFile.addEventListener('click', () => els.fileInput.click());
        els.fileInput.addEventListener('change', handleFileSelect);
        els.btnAnalyzeImg.addEventListener('click', handleAnalyzeImage);
        els.btnCancelImg.addEventListener('click', resetAIUpload);
    }

    els.navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active styling
            els.navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show target pane
            const target = tab.dataset.target;
            els.tabPanes.forEach(pane => {
                if (pane.id === target) {
                    pane.classList.remove('hidden');
                    pane.classList.add('flex');
                } else {
                    pane.classList.add('hidden');
                    pane.classList.remove('flex');
                }
            });

            // Special handling for Chat Input Area
            const chatInputArea = document.getElementById('chatInputArea');
            if (chatInputArea) {
                if (target === 'tab-ask-ai') {
                    chatInputArea.classList.remove('hidden');
                    chatInputArea.classList.add('flex');
                } else {
                    chatInputArea.classList.add('hidden');
                    chatInputArea.classList.remove('flex');
                }
            }
        });
    });

    els.periodToggles.forEach(btn => {
        btn.addEventListener('click', (e) => {
            els.periodToggles.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentPeriodType = e.target.dataset.type;
            if (currentSymbol) {
                fetchData(currentSymbol, currentPeriodType);
            }
        });
    });

    // Chart global defaults
    Chart.defaults.color = '#9CA3AF';
    Chart.defaults.font.family = 'Inter, sans-serif';
}

// UI Handlers
function toggleSettings() {
    els.settingsPanel.classList.toggle('hidden');
    els.tokenStatus.classList.add('hidden');
}

function saveToken() {
    const token = els.tokenInput.value.trim();
    const gemini = els.geminiKeyInput.value.trim();
    
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
        calculateRecommendation(financialData[financialData.length - 1], financialData[financialData.length - 2]);
        
        els.loadingState.classList.add('hidden');
        els.dataContent.classList.remove('hidden');
        els.recContent.classList.remove('hidden');
        
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
    let headHtml = '<th class="px-4 py-3 font-medium">Chỉ tiêu (Tỷ VNĐ)</th>';
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
        bodyHtml += `<td class="px-4 py-3 text-white">${m.name}</td>`;
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
function calculateRecommendation(latest, previous) {
    if (!latest) return;
    
    // Extract base metrics
    const getFin = (item, keysArr) => item && item.financialValues ? getProp(item.financialValues, keysArr) : undefined;
    
    const pe = latest.PE || getFin(latest, ['PE']);
    const roe = getFin(latest, ['ROE']);
    const grossMargin = getFin(latest, ['GrossMargin']);
    
    let score = 0;
    let reasons = [];
    let holding = 'Trung - Dài hạn (6-12 tháng)';
    let verdict = 'Đứng ngoài';
    let verdictClass = 'text-gray-400';

    // 1. Tăng trưởng Lợi nhuận (Profit Growth)
    let proGrowth = 0;
    if (previous) {
        let lPro = getFin(latest, ['ParentCompanyShareholderProfitAfterTax', 'ProfitAfterTax']);
        let pPro = getFin(previous, ['ParentCompanyShareholderProfitAfterTax', 'ProfitAfterTax']);
        if (lPro && pPro) {
            proGrowth = ((lPro - pPro) / Math.abs(pPro)) * 100;
            if (proGrowth > 15) {
                score += 30;
                reasons.push(`<li class="text-finance-up"><i class="fa-solid fa-check-circle mr-2"></i>Tăng trưởng lợi nhuận cực tốt (${proGrowth.toFixed(1)}%)</li>`);
                holding = 'Ngắn - Trung hạn (3-6 tháng)'; // Đánh sóng tăng trưởng
            } else if (proGrowth > 0) {
                score += 15;
                reasons.push(`<li class="text-finance-up"><i class="fa-solid fa-check-circle mr-2"></i>Lợi nhuận có sự tăng trưởng nhẹ (${proGrowth.toFixed(1)}%)</li>`);
            } else {
                reasons.push(`<li class="text-finance-down"><i class="fa-solid fa-times-circle mr-2"></i>Lợi nhuận đang suy giảm (${proGrowth.toFixed(1)}%)</li>`);
            }
        }
    }

    // 2. Hiệu quả hoạt động (ROE)
    if (roe) {
        if (roe > 0.20) { // ROE > 20%
            score += 30;
            reasons.push(`<li class="text-finance-up"><i class="fa-solid fa-check-circle mr-2"></i>Hiệu suất sinh lời trên vốn (ROE) xuất sắc (${(roe*100).toFixed(1)}%)</li>`);
        } else if (roe > 0.12) {
            score += 15;
            reasons.push(`<li class="text-white"><i class="fa-solid fa-minus-circle text-gray-400 mr-2"></i>ROE ở mức khá (${(roe*100).toFixed(1)}%)</li>`);
        } else {
            reasons.push(`<li class="text-finance-down"><i class="fa-solid fa-times-circle mr-2"></i>ROE thấp, hiệu quả sử dụng vốn chưa tốt</li>`);
        }
    }

    // 3. Biên an toàn (Định giá P/E)
    let safetyStr = 'Khó xác định';
    if (pe) {
        if (pe < 10 && pe > 0) {
            score += 30;
            safetyStr = 'Cao (Đang định giá rẻ)';
            reasons.push(`<li class="text-finance-up"><i class="fa-solid fa-check-circle mr-2"></i>Định giá P/E cực hấp dẫn (${pe.toFixed(1)}), có biên an toàn lớn</li>`);
            holding = 'Dài hạn (1-3 năm)'; // Đầu tư giá trị
        } else if (pe < 15 && pe > 0) {
            score += 15;
            safetyStr = 'Trung bình';
            reasons.push(`<li class="text-white"><i class="fa-solid fa-minus-circle text-gray-400 mr-2"></i>P/E ở mức hợp lý (${pe.toFixed(1)})</li>`);
        } else if (pe >= 15) {
            safetyStr = 'Thấp (Đã phản ánh vào giá)';
            reasons.push(`<li class="text-finance-down"><i class="fa-solid fa-times-circle mr-2"></i>Định giá P/E khá cao (${pe.toFixed(1)})</li>`);
        }
    }

    // 4. Biên lợi nhuận
    if (grossMargin && grossMargin > 0.25) {
        score += 10;
        reasons.push(`<li class="text-finance-up"><i class="fa-solid fa-check-circle mr-2"></i>Lợi thế cạnh tranh tốt (Biên LN gộp cao)</li>`);
    }

    // Final Verdict
    if (score >= 70) {
        verdict = 'TÍCH CỰC MUA VÀO';
        verdictClass = 'text-brand';
        els.scoreCircle.setAttribute('stroke', '#00F0FF');
    } else if (score >= 40) {
        verdict = 'NẮM GIỮ / THEO DÕI';
        verdictClass = 'text-yellow-400';
        els.scoreCircle.setAttribute('stroke', '#FBBF24');
    } else {
        verdict = 'ĐỨNG NGOÀI';
        verdictClass = 'text-finance-down';
        els.scoreCircle.setAttribute('stroke', '#FF1744');
        holding = 'Chưa khuyến nghị tham gia';
    }

    // Update UI
    els.aiScore.textContent = score;
    els.scoreCircle.style.strokeDasharray = `${score}, 100`;
    els.aiVerdict.textContent = verdict;
    els.aiVerdict.className = `text-xl font-bold mt-1 ${verdictClass}`;
    
    els.aiHoldingPeriod.textContent = holding;
    els.aiPE.textContent = pe ? pe.toFixed(2) : 'Không có DL';
    els.aiSafety.textContent = safetyStr;
    
    els.aiReasoning.innerHTML = reasons.length ? reasons.join('') : '<li class="text-gray-400">Không đủ dữ liệu để đánh giá</li>';
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
}

async function handleAnalyzeImage() {
    const apiKey = localStorage.getItem('gemini_api_key');
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

    try {
        const response = await callGeminiAI(apiKey, selectedFilesData);
        displayAIAnalysis(response);
    } catch (error) {
        let errMsg = error.message;
        if (errMsg.toLowerCase().includes("api key") || errMsg.toLowerCase().includes("leaked") || errMsg.toLowerCase().includes("invalid")) {
            errMsg = "Khóa API Gemini mặc định đã lỗi. Vui lòng nhập Key của bạn trong phần Cài đặt (⚙️).";
        }
        alert("Lỗi khi phân tích: " + errMsg);
        els.previewArea.classList.remove('hidden');
        els.previewArea.classList.add('flex');
    } finally {
        els.aiAnalysisLoading.classList.add('hidden');
    }
}

async function callGeminiAI(apiKey, filesData) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    const prompt = `Bạn là một chuyên gia phân tích tài chính cao cấp tại Việt Nam. 
Hãy đọc tài liệu/hình ảnh báo cáo tài chính này và thực hiện các yêu cầu sau để giúp tôi học hỏi:
1. Giải thích ý nghĩa của các con số quan trọng trong tài liệu (Doanh thu, Lợi nhuận, Nợ, Tồn kho... tùy theo dữ liệu có trong tệp).
2. Chỉ ra các "Dấu hiệu rủi ro" tiềm ẩn (nếu có) hoặc "Điểm sáng" tích cực.
3. Phân tích cơ hội đầu tư dựa trên dữ liệu này.
4. Đưa ra 1 bài học kinh nghiệm ngắn gọn để tôi có thể tự áp dụng khi đọc các BCTC khác.

Hãy trình bày bằng tiếng Việt, chia các mục rõ ràng bằng tiêu đề và gạch đầu dòng. Dùng ngôn ngữ dễ hiểu cho người mới học.`;

    const parts = [
        { text: prompt }
    ];
    
    filesData.forEach(file => {
        parts.push({
            inline_data: { mime_type: file.mimeType, data: file.base64 }
        });
    });

    const payload = {
        contents: [{
            parts: parts
        }]
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || "Lỗi API Gemini");
    }

    const result = await response.json();
    return result.candidates[0].content.parts[0].text;
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
    
    // Smooth scroll to result
    els.aiAnalysisResult.scrollIntoView({ behavior: 'smooth' });
}

// -----------------------------------------------------
// CHATBOT LOGIC (HỎI AI)
// -----------------------------------------------------

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
    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) {
        alert("Vui lòng nhập Gemini API Key trong phần Cài đặt!");
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

    chatHistory.push({
        role: "user",
        parts: [{ text: text + contextStr }]
    });

    appendLoading();

    try {
        const responseText = await callGeminiChat(apiKey, chatHistory);
        removeLoading();
        appendMessage('model', responseText);
        
        // Add AI response to history
        chatHistory.push({
            role: "model",
            parts: [{ text: responseText }]
        });
        
    } catch (error) {
        removeLoading();
        let errMsg = error.message;
        if (errMsg.toLowerCase().includes("api key") || errMsg.toLowerCase().includes("leaked") || errMsg.toLowerCase().includes("invalid")) {
            errMsg = "Khóa API Gemini (AI) mặc định đã hết hạn hoặc bị vô hiệu hóa. <br><br>👉 Vui lòng mở phần <strong>Cài đặt</strong> (biểu tượng ⚙️ ở góc phải trên cùng) và nhập <strong>Gemini API Key</strong> của riêng bạn để tiếp tục sử dụng tính năng AI nhé!";
        } else {
            errMsg = "Xin lỗi, đã có lỗi xảy ra: " + errMsg;
        }
        appendMessage('model', errMsg);
        chatHistory.pop(); // Remove the failed user message from history to prevent sync issues
    }
}

async function callGeminiChat(apiKey, history) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    const systemInstruction = `Bạn là Cố vấn Tài chính AI hàng đầu Việt Nam. 
Mục tiêu của bạn là giúp người dùng cá nhân đưa ra quyết định đầu tư chứng khoán chính xác.

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

    const payload = {
        systemInstruction: {
            parts: [{ text: systemInstruction }]
        },
        contents: history
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || "Lỗi API Gemini");
    }

    const result = await response.json();
    return result.candidates[0].content.parts[0].text;
}

// Run app
document.addEventListener('DOMContentLoaded', init);
