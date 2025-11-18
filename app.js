// ============================================
// FOOTWEAR SAMPLE TRACKER v3.0 - APP.JS
// ============================================

let samples = [];
let currentEditingId = null;
let githubToken = null;
let currentPhotos = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadSamples();
    setupEventListeners();
    loadUserName();
});

function setupEventListeners() {
    document.getElementById('sampleForm').addEventListener('submit', saveSample);
    document.getElementById('photoInput').addEventListener('change', handlePhotoUpload);
    document.getElementById('importInput').addEventListener('change', handleImport);
    document.getElementById('searchBox').addEventListener('input', filterSamples);
    document.getElementById('stageFilter').addEventListener('change', filterSamples);
}

// LOAD/SAVE
function loadSamples() {
    const stored = localStorage.getItem('footwearSamples');
    samples = stored ? JSON.parse(stored) : [];
    renderView();
}

function saveSamples() {
    localStorage.setItem('footwearSamples', JSON.stringify(samples));
}

function loadUserName() {
    const userName = localStorage.getItem('userName');
    if (userName) document.getElementById('userName').value = userName;
    document.getElementById('userName').addEventListener('blur', () => {
        localStorage.setItem('userName', document.getElementById('userName').value);
    });
}

// MODAL
function openAddModal() {
    currentEditingId = null;
    currentPhotos = [];
    document.getElementById('modalTitle').textContent = 'Add New Sample';
    document.getElementById('sampleForm').reset();
    document.getElementById('photoPreview').innerHTML = '';
    document.getElementById('sampleModal').classList.add('active');
}

function closeModal() {
    document.getElementById('sampleModal').classList.remove('active');
    currentPhotos = [];
}

function closeViewModal() {
    document.getElementById('viewModal').classList.remove('active');
}

// SAVE SAMPLE
async function saveSample(e) {
    e.preventDefault();
    
    const userName = document.getElementById('userName').value || 'Unknown';
    const now = new Date().toISOString();
    
    const sampleData = {
        id: currentEditingId ? currentEditingId : 'FS-' + String(Math.floor(Math.random() * 10000)).padStart(4, '0'),
        sampleName: document.getElementById('sampleName').value,
        client: document.getElementById('client').value,
        dateReceived: document.getElementById('dateReceived').value,
        currentStage: document.getElementById('currentStage').value,
        notes: document.getElementById('notes').value,
        photos: currentPhotos,
        savedBy: userName,
        lastEditedBy: userName,
        lastEditedDate: now,
        
        materialDetails: {
            upperMaterial: {
                vendor: document.getElementById('upperVendor').value,
                stage: document.getElementById('upperStage').value,
                deliveryDate: document.getElementById('upperDelivery').value,
                remarks: document.getElementById('upperRemarks').value
            },
            last: {
                vendor: document.getElementById('lastVendor').value,
                stage: document.getElementById('lastStage').value,
                deliveryDate: document.getElementById('lastDelivery').value,
                remarks: document.getElementById('lastRemarks').value
            },
            sole: {
                vendor: document.getElementById('soleVendor').value,
                stage: document.getElementById('soleStage').value,
                deliveryDate: document.getElementById('soleDelivery').value,
                remarks: document.getElementById('soleRemarks').value
            },
            otherMaterial1: {
                name: document.getElementById('other1Name').value,
                vendor: document.getElementById('other1Vendor').value,
                stage: document.getElementById('other1Stage').value,
                deliveryDate: document.getElementById('other1Delivery').value,
                remarks: document.getElementById('other1Remarks').value
            },
            otherMaterial2: {
                name: document.getElementById('other2Name').value,
                vendor: document.getElementById('other2Vendor').value,
                stage: document.getElementById('other2Stage').value,
                deliveryDate: document.getElementById('other2Delivery').value,
                remarks: document.getElementById('other2Remarks').value
            }
        }
    };
    
    if (currentEditingId) {
        const index = samples.findIndex(s => s.id === currentEditingId);
        if (index !== -1) samples[index] = sampleData;
    } else {
        samples.push(sampleData);
    }
    
    saveSamples();
    closeModal();
    renderView();
    showToast('✅ Sample saved successfully!');
}

// PHOTO COMPRESSION
async function handlePhotoUpload(e) {
    const files = Array.from(e.target.files);
    for (const file of files) {
        if (file.type.startsWith('image/')) {
            const base64 = await fileToBase64(file);
            const compressed = await compressImage(base64);
            currentPhotos.push(compressed);
        }
    }
    updatePhotoPreview();
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

async function compressImage(base64String, maxWidth = 800, maxHeight = 800, quality = 0.7) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width, height = img.height;
            
            if (width > height) {
                if (width > maxWidth) {
                    height = Math.round(height * (maxWidth / width));
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = Math.round(width * (maxHeight / height));
                    height = maxHeight;
                }
            }
            
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(img, 0, 0, width, height);
            
            const compressed = canvas.toDataURL('image/jpeg', quality);
            const ratio = Math.round((1 - compressed.length / base64String.length) * 100);
            console.log(`Photo compressed: ${ratio}% smaller`);
            
            resolve(compressed);
        };
        img.onerror = () => resolve(base64String);
        img.src = base64String;
    });
}

function updatePhotoPreview() {
    const preview = document.getElementById('photoPreview');
    preview.innerHTML = currentPhotos.map((photo, idx) => 
        `<div style="position:relative;"><img src="${photo}" class="photo-thumb" style="width:80px;height:80px;border-radius:6px;object-fit:cover;"><button type="button" onclick="removePhoto(${idx})" style="position:absolute;top:-8px;right:-8px;background:red;color:white;border:none;border-radius:50%;width:24px;height:24px;cursor:pointer;">✕</button></div>`
    ).join('');
}

function removePhoto(idx) {
    currentPhotos.splice(idx, 1);
    updatePhotoPreview();
}

// RENDER VIEWS
function renderView() {
    const view = document.querySelector('.view-panel.active').id;
    
    if (view === 'dashboardView') renderDashboard();
    else if (view === 'listView') renderList();
    else if (view === 'kanbanView') renderKanban();
}

function renderDashboard() {
    const filtered = getFilteredSamples();
    const html = filtered.map(sample => `
        <div class="sample-card" onclick="viewDetails('${sample.id}')">
            <div class="sample-card-header">
                <div>
                    <div class="sample-card-title">${sample.sampleName}</div>
                    <div style="font-size:12px;opacity:0.9;">${sample.id}</div>
                </div>
                <div style="background:rgba(255,255,255,0.3);padding:4px 8px;border-radius:4px;font-size:12px;font-weight:600;">${sample.currentStage}</div>
            </div>
            <div class="sample-card-body">
                <div class="sample-card-info"><strong>Client:</strong> ${sample.client}</div>
                <div class="sample-card-info"><strong>Date:</strong> ${sample.dateReceived}</div>
                <div class="sample-card-info"><strong>Saved by:</strong> ${sample.savedBy}</div>
                ${sample.photos.length > 0 ? `<div class="photo-preview">${sample.photos.slice(0,3).map(p => `<img src="${p}" class="photo-thumb">`).join('')}</div>` : ''}
                <div class="card-actions">
                    <button onclick="editSample('${sample.id}')" class="btn btn-secondary">✏️ Edit</button>
                    <button onclick="deleteSample('${sample.id}')" class="btn btn-danger">🗑️ Delete</button>
                </div>
            </div>
        </div>
    `).join('');
    
    document.getElementById('samplesGrid').innerHTML = html || '<p>No samples found</p>';
}

function renderList() {
    const filtered = getFilteredSamples();
    const html = `
        <table class="list-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Sample</th>
                    <th>Client</th>
                    <th>Date</th>
                    <th>Stage</th>
                    <th>Saved By</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${filtered.map(s => `
                    <tr>
                        <td>${s.id}</td>
                        <td>${s.sampleName}</td>
                        <td>${s.client}</td>
                        <td>${s.dateReceived}</td>
                        <td>${s.currentStage}</td>
                        <td>${s.savedBy}</td>
                        <td>
                            <button onclick="viewDetails('${s.id}')" class="btn btn-secondary" style="padding:4px 8px;font-size:12px;">View</button>
                            <button onclick="editSample('${s.id}')" class="btn btn-secondary" style="padding:4px 8px;font-size:12px;">Edit</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    document.getElementById('listContainer').innerHTML = html || '<p>No samples found</p>';
}

function renderKanban() {
    const stages = ['Material', 'Development', 'Quality Check', 'Ready to Ship', 'Delivered'];
    const board = document.getElementById('kanbanBoard');
    board.innerHTML = stages.map(stage => {
        const stageCards = samples.filter(s => s.currentStage === stage);
        return `
            <div class="kanban-column">
                <h3>${stage}</h3>
                <div class="kanban-lane">
                    ${stageCards.map(s => `
                        <div class="kanban-card" onclick="viewDetails('${s.id}')">
                            <strong>${s.sampleName}</strong><br>
                            <small>${s.client}</small>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}

// FILTER
function getFilteredSamples() {
    const search = document.getElementById('searchBox').value.toLowerCase();
    const stage = document.getElementById('stageFilter').value;
    
    return samples.filter(s => {
        const matchSearch = !search || s.sampleName.toLowerCase().includes(search) || s.client.toLowerCase().includes(search);
        const matchStage = !stage || s.currentStage === stage;
        return matchSearch && matchStage;
    });
}

function filterSamples() {
    renderView();
}

// EDIT
function editSample(id) {
    const sample = samples.find(s => s.id === id);
    if (!sample) return;
    
    currentEditingId = id;
    currentPhotos = [...sample.photos];
    
    document.getElementById('modalTitle').textContent = 'Edit Sample';
    document.getElementById('sampleName').value = sample.sampleName;
    document.getElementById('client').value = sample.client;
    document.getElementById('dateReceived').value = sample.dateReceived;
    document.getElementById('currentStage').value = sample.currentStage;
    document.getElementById('notes').value = sample.notes;
    
    // Materials
    document.getElementById('upperVendor').value = sample.materialDetails.upperMaterial.vendor;
    document.getElementById('upperStage').value = sample.materialDetails.upperMaterial.stage;
    document.getElementById('upperDelivery').value = sample.materialDetails.upperMaterial.deliveryDate;
    document.getElementById('upperRemarks').value = sample.materialDetails.upperMaterial.remarks;
    
    document.getElementById('lastVendor').value = sample.materialDetails.last.vendor;
    document.getElementById('lastStage').value = sample.materialDetails.last.stage;
    document.getElementById('lastDelivery').value = sample.materialDetails.last.deliveryDate;
    document.getElementById('lastRemarks').value = sample.materialDetails.last.remarks;
    
    document.getElementById('soleVendor').value = sample.materialDetails.sole.vendor;
    document.getElementById('soleStage').value = sample.materialDetails.sole.stage;
    document.getElementById('soleDelivery').value = sample.materialDetails.sole.deliveryDate;
    document.getElementById('soleRemarks').value = sample.materialDetails.sole.remarks;
    
    document.getElementById('other1Name').value = sample.materialDetails.otherMaterial1.name;
    document.getElementById('other1Vendor').value = sample.materialDetails.otherMaterial1.vendor;
    document.getElementById('other1Stage').value = sample.materialDetails.otherMaterial1.stage;
    document.getElementById('other1Delivery').value = sample.materialDetails.otherMaterial1.deliveryDate;
    document.getElementById('other1Remarks').value = sample.materialDetails.otherMaterial1.remarks;
    
    document.getElementById('other2Name').value = sample.materialDetails.otherMaterial2.name;
    document.getElementById('other2Vendor').value = sample.materialDetails.otherMaterial2.vendor;
    document.getElementById('other2Stage').value = sample.materialDetails.otherMaterial2.stage;
    document.getElementById('other2Delivery').value = sample.materialDetails.otherMaterial2.deliveryDate;
    document.getElementById('other2Remarks').value = sample.materialDetails.otherMaterial2.remarks;
    
    updatePhotoPreview();
    document.getElementById('sampleModal').classList.add('active');
}

// DELETE
function deleteSample(id) {
    if (confirm('Delete this sample?')) {
        samples = samples.filter(s => s.id !== id);
        saveSamples();
        renderView();
        showToast('✅ Sample deleted');
    }
}

// VIEW DETAILS
function viewDetails(id) {
    const sample = samples.find(s => s.id === id);
    if (!sample) return;
    
    const html = `
        <div class="detail-section">
            <h3>Basic Info</h3>
            <div class="detail-row"><div class="detail-label">Sample Name:</div><div>${sample.sampleName}</div></div>
            <div class="detail-row"><div class="detail-label">Client:</div><div>${sample.client}</div></div>
            <div class="detail-row"><div class="detail-label">Date Received:</div><div>${sample.dateReceived}</div></div>
            <div class="detail-row"><div class="detail-label">Current Stage:</div><div>${sample.currentStage}</div></div>
            <div class="detail-row"><div class="detail-label">Saved By:</div><div>${sample.savedBy}</div></div>
            <div class="detail-row"><div class="detail-label">Last Edited:</div><div>${sample.lastEditedBy} - ${new Date(sample.lastEditedDate).toLocaleString()}</div></div>
            <div class="detail-row"><div class="detail-label">Notes:</div><div>${sample.notes}</div></div>
        </div>
        
        <div class="detail-section">
            <h3>Materials</h3>
            <div><strong>Upper Material:</strong> ${sample.materialDetails.upperMaterial.vendor} | Stage: ${sample.materialDetails.upperMaterial.stage} | Delivery: ${sample.materialDetails.upperMaterial.deliveryDate} | ${sample.materialDetails.upperMaterial.remarks}</div>
            <div><strong>Last:</strong> ${sample.materialDetails.last.vendor} | Stage: ${sample.materialDetails.last.stage} | Delivery: ${sample.materialDetails.last.deliveryDate} | ${sample.materialDetails.last.remarks}</div>
            <div><strong>Sole:</strong> ${sample.materialDetails.sole.vendor} | Stage: ${sample.materialDetails.sole.stage} | Delivery: ${sample.materialDetails.sole.deliveryDate} | ${sample.materialDetails.sole.remarks}</div>
            <div><strong>${sample.materialDetails.otherMaterial1.name || 'Other 1'}:</strong> ${sample.materialDetails.otherMaterial1.vendor} | Delivery: ${sample.materialDetails.otherMaterial1.deliveryDate} | ${sample.materialDetails.otherMaterial1.remarks}</div>
            <div><strong>${sample.materialDetails.otherMaterial2.name || 'Other 2'}:</strong> ${sample.materialDetails.otherMaterial2.vendor} | Delivery: ${sample.materialDetails.otherMaterial2.deliveryDate} | ${sample.materialDetails.otherMaterial2.remarks}</div>
        </div>
        
        ${sample.photos.length > 0 ? `<div class="detail-section"><h3>Photos</h3><div class="photo-preview">${sample.photos.map(p => `<img src="${p}" class="photo-thumb">`).join('')}</div></div>` : ''}
        
        <div style="margin-top:20px;">
            <button onclick="editSample('${sample.id}')" class="btn btn-primary">✏️ Edit</button>
            <button onclick="deleteSample('${sample.id}')" class="btn btn-danger">🗑️ Delete</button>
            <button onclick="closeViewModal()" class="btn btn-secondary">Close</button>
        </div>
    `;
    
    document.getElementById('viewDetails').innerHTML = html;
    document.getElementById('viewModal').classList.add('active');
}

// VIEW SELECTOR
function switchView(viewName) {
    document.querySelectorAll('.view-panel').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById(viewName + 'View').classList.add('active');
    document.getElementById('view' + viewName.charAt(0).toUpperCase() + viewName.slice(1)).classList.add('active');
    
    renderView();
}

// EXPORT/IMPORT
function exportJSON() {
    const dataStr = JSON.stringify(samples, null, 2);
    const blob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `footwear-samples-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    showToast('✅ Data exported');
}

function importJSON() {
    document.getElementById('importInput').click();
}

function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const imported = JSON.parse(event.target.result);
            const dataToImport = Array.isArray(imported) ? imported : imported.data || [];
            
            if (confirm(`Import ${dataToImport.length} samples?`)) {
                samples = dataToImport;
                saveSamples();
                loadSamples();
                showToast(`✅ Imported ${dataToImport.length} samples`);
            }
        } catch (error) {
            showToast('❌ Error reading file');
        }
    };
    reader.readAsText(file);
}

// EXCEL EXPORT
async function exportExcel() {
    if (!samples.length) {
        showToast('No samples to export');
        return;
    }
    
    showLoading('Creating Excel...');
    
    try {
        const workbook = new ExcelJS.Workbook();
        
        // Sheet 1: Samples
        const sheet1 = workbook.addWorksheet('Samples');
        sheet1.columns = [
            {header: 'ID', key: 'id'},
            {header: 'Sample Name', key: 'sampleName'},
            {header: 'Client', key: 'client'},
            {header: 'Date Received', key: 'dateReceived'},
            {header: 'Stage', key: 'currentStage'},
            {header: 'Saved By', key: 'savedBy'},
            {header: 'Notes', key: 'notes'}
        ];
        
        samples.forEach(s => {
            sheet1.addRow({
                id: s.id,
                sampleName: s.sampleName,
                client: s.client,
                dateReceived: s.dateReceived,
                currentStage: s.currentStage,
                savedBy: s.savedBy,
                notes: s.notes
            });
        });
        
        // Sheet 2: Materials
        const sheet2 = workbook.addWorksheet('Materials');
        sheet2.columns = [
            {header: 'Sample ID', key: 'sampleId'},
            {header: 'Material Type', key: 'type'},
            {header: 'Vendor', key: 'vendor'},
            {header: 'Stage', key: 'stage'},
            {header: 'Delivery Date', key: 'deliveryDate'},
            {header: 'Remarks', key: 'remarks'}
        ];
        
        samples.forEach(s => {
            const materials = [
                {type: 'Upper', ...s.materialDetails.upperMaterial},
                {type: 'Last', ...s.materialDetails.last},
                {type: 'Sole', ...s.materialDetails.sole},
                {type: s.materialDetails.otherMaterial1.name || 'Other 1', ...s.materialDetails.otherMaterial1},
                {type: s.materialDetails.otherMaterial2.name || 'Other 2', ...s.materialDetails.otherMaterial2}
            ];
            
            materials.forEach(m => {
                sheet2.addRow({
                    sampleId: s.id,
                    type: m.type,
                    vendor: m.vendor,
                    stage: m.stage,
                    deliveryDate: m.deliveryDate,
                    remarks: m.remarks
                });
            });
        });
        
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `footwear-samples-${new Date().toISOString().split('T')[0]}.xlsx`;
        link.click();
        
        showToast('✅ Excel exported');
    } catch (error) {
        showToast('❌ Export error');
    }
    
    hideLoading();
}

// GITHUB SYNC
async function saveToGitHub() {
    if (!githubToken) {
        githubToken = prompt('Paste your GitHub Personal Access Token (ghp_...):\n\nIt will only be used in this session.');
        if (!githubToken) return;
    }
    
    showLoading('Saving to GitHub...');
    
    try {
        const url = 'https://api.github.com/repos/SIVIFashion/footwear-sample-tracker/contents/live-samples.json';
        
        const getResp = await fetch(url, {
            headers: {'Authorization': `token ${githubToken}`}
        });
        
        if (!getResp.ok) throw new Error('Could not access GitHub');
        
        const fileData = await getResp.json();
        
        const putResp = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
                message: `Update samples - ${new Date().toLocaleString()}`,
                content: btoa(JSON.stringify(samples, null, 2)),
                sha: fileData.sha
            })
        });
        
        if (putResp.ok) {
            showToast('✅ Saved to GitHub!');
        } else {
            throw new Error('Save failed');
        }
    } catch (error) {
        githubToken = null;
        showToast('❌ ' + error.message);
    }
    
    hideLoading();
}

async function loadFromGitHub() {
    if (!githubToken) {
        githubToken = prompt('Paste your GitHub Personal Access Token (ghp_...):\n\nIt will only be used in this session.');
        if (!githubToken) return;
    }
    
    showLoading('Loading from GitHub...');
    
    try {
        const url = 'https://api.github.com/repos/SIVIFashion/footwear-sample-tracker/contents/live-samples.json';
        
        const resp = await fetch(url, {
            headers: {'Authorization': `token ${githubToken}`}
        });
        
        if (!resp.ok) throw new Error('Could not load from GitHub');
        
        const fileData = await resp.json();
        const decodedContent = JSON.parse(atob(fileData.content));
        
        samples = Array.isArray(decodedContent) ? decodedContent : decodedContent.data || [];
        saveSamples();
        loadSamples();
        
        showToast('✅ Loaded from GitHub!');
    } catch (error) {
        githubToken = null;
        showToast('❌ ' + error.message);
    }
    
    hideLoading();
}

// UI HELPERS
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3000);
}

function showLoading(text) {
    document.getElementById('loadingText').textContent = text;
    document.getElementById('loading').classList.add('active');
}

function hideLoading() {
    document.getElementById('loading').classList.remove('active');
}
