// Enhanced Sample Tracker Application JavaScript with Full Data Persistence

// Application State
let samples = [];
let nextSampleNumber = 6;
let currentSampleId = null;
let deleteTargetId = null;
let pendingSaveData = null;
let currentUserName = '';

// ========================================
// PHOTO COMPRESSION FUNCTION
// ========================================
function compressImage(base64String, maxWidth = 800, maxHeight = 800, quality = 0.7) {
    return new Promise((resolve, reject) => {
        try {
            const img = new Image();
            
            img.onload = function() {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                
                // Calculate new dimensions
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
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                // Compress to JPEG with quality setting
                const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
                
                // Calculate compression ratio
                const originalSize = base64String.length;
                const compressedSize = compressedBase64.length;
                const ratio = Math.round((1 - compressedSize / originalSize) * 100);
                
                console.log('Photo compressed: ' + ratio + '% smaller');
                
                resolve(compressedBase64);
            };
            
            img.onerror = function() {
                console.log('Could not load image, using original');
                resolve(base64String);
            };
            
            img.src = base64String;
            
        } catch (error) {
            console.log('Compression error:', error);
            resolve(base64String);
        }
    });
}

// Initial sample data from JSON
const initialSampleData = [
    {
        "id": "FS-001",
        "sampleName": "Classic Oxford Brown",
        "dateReceived": "2025-08-15",
        "client": "Premium Footwear Co.",
        "photos": [],
        "materialDetails": {
            "upperMaterial": { "vendor": "Italian Leather Co.", "stage": "Approved", "deliveryDate": "2025-08-20", "notes": "Premium full-grain leather" },
            "last": { "vendor": "Precision Lasts Ltd.", "stage": "Delivered", "deliveryDate": "2025-08-18", "notes": "Custom last #47B" },
            "sole": { "vendor": "Vibram India", "stage": "Quality Check", "deliveryDate": "2025-08-22", "notes": "Leather sole with rubber heel" },
            "otherMaterial1": { "name": "Thread", "vendor": "Coats Thread", "stage": "Delivered", "deliveryDate": "2025-08-16", "notes": "Polyester thread #40" },
            "otherMaterial2": { "name": "Hardware", "vendor": "YKK Fastening", "stage": "Approved", "deliveryDate": "2025-08-17", "notes": "Brass eyelets and hooks" }
        },
        "developmentStages": {
            "patternTrial": { "status": "Completed", "deliveryDate": "2025-08-25", "notes": "Pattern approved on first trial" },
            "upperReady": { "status": "In Progress", "deliveryDate": "2025-08-28", "notes": "50% complete" },
            "soleReady": { "status": "Not Started", "deliveryDate": "2025-08-30", "notes": "" },
            "assembly": { "status": "Not Started", "deliveryDate": "2025-09-02", "notes": "" },
            "qualityCheck": { "status": "Not Started", "deliveryDate": "2025-09-05", "notes": "" }
        },
        "readyToShip": false,
        "notes": "High-quality leather sourced. Pattern approved on first trial.",
        "currentStage": "Development",
        "lastUpdated": "2025-08-17T14:30:00Z",
        "lastEditedBy": "Rajesh Kumar",
        "lastEditedDate": "2025-08-17T14:30:00Z"
    }
];

// Local Storage Functions
function saveToLocalStorage() {
    try {
        localStorage.setItem('footwearSamples', JSON.stringify(samples));
        localStorage.setItem('footwearSamplesNextId', nextSampleNumber.toString());
        console.log('Data saved to localStorage');
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
        showToast('Failed to save data locally', 'error');
    }
}

function loadFromLocalStorage() {
    try {
        const stored = localStorage.getItem('footwearSamples');
        const storedNextId = localStorage.getItem('footwearSamplesNextId');
        
        if (stored) {
            samples = JSON.parse(stored);
            console.log('Data loaded from localStorage:', samples.length, 'samples');
        } else {
            samples = [...initialSampleData];
            saveToLocalStorage();
            console.log('Loaded initial sample data');
        }
        
        if (storedNextId) {
            nextSampleNumber = parseInt(storedNextId);
        }
        
        samples.forEach(sample => {
            if (!sample.photos) sample.photos = [];
            if (!sample.materialDetails) sample.materialDetails = {};
            if (!sample.developmentStages) sample.developmentStages = {};
        });
        
        return true;
    } catch (error) {
        console.error('Failed to load from localStorage:', error);
        samples = [...initialSampleData];
        return false;
    }
}

// Utility Functions
function generateSampleId() {
    return 'FS-' + String(nextSampleNumber++).padStart(3, '0');
}

function formatDate(dateString) {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatDateTime(dateString) {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getStatusBadgeClass(status) {
    switch (status.toLowerCase()) {
        case 'completed':
            return 'status-badge--completed';
        case 'in progress':
            return 'status-badge--in-progress';
        case 'failed':
            return 'status-badge--failed';
        default:
            return 'status-badge--not-started';
    }
}

function determineCurrentStage(sample) {
    if (sample.readyToShip) {
        return 'Ready to Ship';
    }
    
    const devStages = sample.developmentStages || {};
    if (devStages.qualityCheck?.status === 'Completed' || 
        devStages.qualityCheck?.status === 'In Progress' || 
        devStages.qualityCheck?.status === 'Failed') {
        return 'Final';
    }
    
    if (devStages.patternTrial?.status === 'Completed' || 
        devStages.patternTrial?.status === 'In Progress' || 
        devStages.patternTrial?.status === 'Failed' ||
        devStages.upperReady?.status === 'Completed' || 
        devStages.upperReady?.status === 'In Progress' ||
        devStages.soleReady?.status === 'Completed' || 
        devStages.soleReady?.status === 'In Progress' ||
        devStages.assembly?.status === 'Completed' || 
        devStages.assembly?.status === 'In Progress') {
        return 'Development';
    }
    
    return 'Material';
}

function getOverallStatus(sample) {
    if (sample.readyToShip) {
        return 'Ready to Ship';
    }
    
    const devStages = sample.developmentStages || {};
    if (devStages.patternTrial?.status === 'Failed' || 
        devStages.qualityCheck?.status === 'Failed') {
        return 'Failed';
    }
    
    const materialCompleted = Object.values(sample.materialDetails || {}).every(material => 
        material.stage === 'Approved' || material.stage === 'Delivered'
    );
    
    const developmentCompleted = devStages.patternTrial?.status === 'Completed' &&
                               devStages.upperReady?.status === 'Completed' &&
                               devStages.soleReady?.status === 'Completed' &&
                               devStages.assembly?.status === 'Completed';
    
    if (materialCompleted && developmentCompleted && devStages.qualityCheck?.status === 'Completed') {
        return 'Completed';
    }
    
    const anyInProgress = devStages.patternTrial?.status === 'In Progress' ||
                         devStages.upperReady?.status === 'In Progress' ||
                         devStages.soleReady?.status === 'In Progress' ||
                         devStages.assembly?.status === 'In Progress' ||
                         devStages.qualityCheck?.status === 'In Progress' ||
                         Object.values(sample.materialDetails || {}).some(material => 
                             ['Sourcing', 'Ordered', 'Quality Check'].includes(material.stage)
                         );
    
    if (anyInProgress) {
        return 'In Progress';
    }
    
    return 'Not Started';
}

function calculateMaterialCompletion(sample) {
    if (!sample.materialDetails) return 0;
    
    const materials = Object.values(sample.materialDetails);
    if (materials.length === 0) return 0;
    
    const completedCount = materials.filter(material => 
        material.stage === 'Approved' || material.stage === 'Delivered'
    ).length;
    
    return Math.round((completedCount / materials.length) * 100);
}

function getUniqueClients() {
    const clients = [...new Set(samples.map(sample => sample.client))];
    return clients.sort();
}

function showToast(message, type = 'success') {
    const container = document.getElementById('notification-container');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.innerHTML = '<span class="notification-message">' + message + '</span>';
    
    container.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Photo Management Functions
function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function createPhotoPreview(photoData, index, container) {
    const previewDiv = document.createElement('div');
    previewDiv.className = 'photo-preview-item';
    previewDiv.style.position = 'relative';
    previewDiv.style.display = 'inline-block';
    
    const img = document.createElement('img');
    img.src = photoData;
    img.className = 'photo-preview';
    img.style.width = '80px';
    img.style.height = '80px';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '8px';
    img.style.border = '1px solid #ddd';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '×';
    deleteBtn.className = 'photo-preview-delete';
    deleteBtn.onclick = (e) => {
        e.preventDefault();
        previewDiv.remove();
    };
    
    previewDiv.appendChild(img);
    previewDiv.appendChild(deleteBtn);
    container.appendChild(previewDiv);
    
    return previewDiv;
}

// Client Filter Management
function updateClientFilters() {
    const clients = getUniqueClients();
    const dashboardFilter = document.getElementById('dashboard-client-filter');
    const listFilter = document.getElementById('list-client-filter');
    
    [dashboardFilter, listFilter].forEach(filter => {
        if (filter) {
            const currentValue = filter.value;
            filter.innerHTML = '<option value="">All Clients</option>';
            clients.forEach(client => {
                const option = document.createElement('option');
                option.value = client;
                option.textContent = client;
                filter.appendChild(option);
            });
            filter.value = currentValue;
        }
    });
}

function getFilteredSamples(viewType) {
    let filteredSamples = [...samples];
    
    const clientFilter = document.getElementById(viewType + '-client-filter');
    if (clientFilter && clientFilter.value) {
        filteredSamples = filteredSamples.filter(sample => sample.client === clientFilter.value);
    }
    
    return filteredSamples;
}

// View Management
function showView(viewName) {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    
    const targetView = document.getElementById(viewName + '-view');
    if (targetView) {
        targetView.classList.add('active');
    }
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector('[data-view="' + viewName + '"]');
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// Setup Add Sample Form
function setupAddSampleForm() {
    const form = document.getElementById('add-sample-form');
    const photoInput = document.getElementById('sample-photos');
    const previewContainer = document.getElementById('photo-preview');
    
    if (!form) return;
    
    const dateInput = document.getElementById('date-received');
    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T');
    }
    
    if (photoInput) {
        photoInput.addEventListener('change', async (e) => {
            const files = Array.from(e.target.files);
            for (const file of files) {
                if (file.type.startsWith('image/')) {
                    try {
                        let base64 = await convertFileToBase64(file);
                        // COMPRESS photo automatically
                        base64 = await compressImage(base64);
                        createPhotoPreview(base64, 0, previewContainer);
                    } catch (error) {
                        console.error('Error processing photo:', error);
                    }
                }
            }
        });
    }
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const createdByField = document.getElementById('created-by');
        if (!createdByField.value.trim()) {
            showToast('Please enter your name in the "Created By" field', 'error');
            createdByField.focus();
            return;
        }
        
        const photoElements = previewContainer.querySelectorAll('img');
        const photos = Array.from(photoElements).map(img => img.src);
        
        const newSample = {
            id: generateSampleId(),
            sampleName: document.getElementById('sample-name').value,
            client: document.getElementById('client-name').value,
            dateReceived: document.getElementById('date-received').value,
            currentStage: document.getElementById('initial-stage').value,
            photos: photos,
            notes: document.getElementById('sample-notes').value,
            lastUpdated: new Date().toISOString(),
            lastEditedBy: createdByField.value.trim(),
            lastEditedDate: new Date().toISOString(),
            
            materialDetails: {
                upperMaterial: {
                    vendor: document.getElementById('upper-vendor').value,
                    stage: document.getElementById('upper-stage').value,
                    deliveryDate: document.getElementById('upper-delivery').value,
                    notes: document.getElementById('upper-notes').value
                },
                last: {
                    vendor: document.getElementById('last-vendor').value,
                    stage: document.getElementById('last-stage').value,
                    deliveryDate: document.getElementById('last-delivery').value,
                    notes: document.getElementById('last-notes').value
                },
                sole: {
                    vendor: document.getElementById('sole-vendor').value,
                    stage: document.getElementById('sole-stage').value,
                    deliveryDate: document.getElementById('sole-delivery').value,
                    notes: document.getElementById('sole-notes').value
                },
                otherMaterial1: {
                    name: document.getElementById('other1-name').value,
                    vendor: document.getElementById('other1-vendor').value,
                    stage: document.getElementById('other1-stage').value,
                    deliveryDate: document.getElementById('other1-delivery').value,
                    notes: document.getElementById('other1-notes').value
                },
                otherMaterial2: {
                    name: document.getElementById('other2-name').value,
                    vendor: document.getElementById('other2-vendor').value,
                    stage: document.getElementById('other2-stage').value,
                    deliveryDate: document.getElementById('other2-delivery').value,
                    notes: document.getElementById('other2-notes').value
                }
            },
            
            developmentStages: {
                patternTrial: {
                    status: 'Not Started',
                    deliveryDate: document.getElementById('pattern-delivery').value,
                    notes: document.getElementById('pattern-notes').value
                },
                upperReady: {
                    status: 'Not Started',
                    deliveryDate: document.getElementById('upper-ready-delivery').value,
                    notes: document.getElementById('upper-ready-notes').value
                },
                soleReady: {
                    status: 'Not Started',
                    deliveryDate: document.getElementById('sole-ready-delivery').value,
                    notes: document.getElementById('sole-ready-notes').value
                },
                assembly: {
                    status: 'Not Started',
                    deliveryDate: document.getElementById('assembly-delivery').value,
                    notes: document.getElementById('assembly-notes').value
                },
                qualityCheck: {
                    status: 'Not Started',
                    deliveryDate: document.getElementById('quality-delivery').value,
                    notes: document.getElementById('quality-notes').value
                }
            },
            
            readyToShip: false
        };
        
        samples.push(newSample);
        saveToLocalStorage();
        clearForm();
        updateClientFilters();
        
        showToast('Sample added successfully by ' + createdByField.value.trim() + '!');
        showView('dashboard');
    });
}

function clearForm() {
    const form = document.getElementById('add-sample-form');
    const previewContainer = document.getElementById('photo-preview');
    const dateInput = document.getElementById('date-received');
    
    if (form) form.reset();
    if (previewContainer) previewContainer.innerHTML = '';
    if (dateInput) dateInput.value = new Date().toISOString().split('T');
}

// ========================================
// EXPORT ALL DATA FUNCTION
// ========================================
function exportAllData() {
    try {
        const data = localStorage.getItem('footwearSamples');
        
        if (!data || data === '[]') {
            alert('No data to export!');
            return;
        }
        
        const samples = JSON.parse(data);
        
        const exportData = {
            exportDate: new Date().toISOString(),
            exportVersion: '1.0',
            sampleCount: samples.length,
            data: samples
        };
        
        const jsonString = JSON.stringify(exportData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        
        const dateStr = new Date().toISOString().split('T');
        link.download = 'footwear_samples_backup_' + dateStr + '.json';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        alert('Successfully exported ' + samples.length + ' samples!');
    } catch (error) {
        console.error('Export error:', error);
        alert('Error exporting data. Please try again.');
    }
}

// ========================================
// IMPORT DATA FUNCTIONS
// ========================================
function showImportDialog() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const content = event.target.result;
                const importData = JSON.parse(content);
                
                // Handle both old and new export formats
                let dataToImport = [];
                
                if (Array.isArray(importData)) {
                    // Old format: direct array of samples
                    dataToImport = importData;
                } else if (importData.data && Array.isArray(importData.data)) {
                    // New format: {exportDate, data, sampleCount}
                    dataToImport = importData.data;
                } else {
                    alert('Invalid file format! Could not find samples array.');
                    return;
                }
                
                if (dataToImport.length === 0) {
                    alert('No samples found in file!');
                    return;
                }
                
                const message = 'Import ' + dataToImport.length + ' samples?\n\n' +
                               'This will REPLACE all your current data.\n\n' +
                               'Click OK to continue or Cancel to abort.';
                
                if (confirm(message)) {
                    // Ensure all required fields exist
                    dataToImport.forEach(function(sample) {
                        if (!sample.id) sample.id = 'FS-' + Math.random().toString(36).substr(2, 9);
                        if (!sample.sampleName) sample.sampleName = 'Untitled';
                        if (!sample.client) sample.client = 'Unknown';
                        if (!sample.photos) sample.photos = [];
                        if (!sample.notes) sample.notes = '';
                        if (!sample.currentStage) sample.currentStage = 'Material';
                        if (!sample.lastEditedBy) sample.lastEditedBy = 'Imported';
                        if (!sample.lastEditedDate) sample.lastEditedDate = new Date().toISOString();
                        
                        if (!sample.materialDetails) {
                            sample.materialDetails = {
                                upperMaterial: { vendor: '', stage: 'Not Started', deliveryDate: '', notes: '' },
                                last: { vendor: '', stage: 'Not Started', deliveryDate: '', notes: '' },
                                sole: { vendor: '', stage: 'Not Started', deliveryDate: '', notes: '' },
                                otherMaterial1: { name: '', vendor: '', stage: 'Not Started', deliveryDate: '', notes: '' },
                                otherMaterial2: { name: '', vendor: '', stage: 'Not Started', deliveryDate: '', notes: '' }
                            };
                        }
                        if (!sample.developmentStages) {
                            sample.developmentStages = {
                                patternTrial: { status: 'Not Started', deliveryDate: '', notes: '' },
                                upperReady: { status: 'Not Started', deliveryDate: '', notes: '' },
                                soleReady: { status: 'Not Started', deliveryDate: '', notes: '' },
                                assembly: { status: 'Not Started', deliveryDate: '', notes: '' },
                                qualityCheck: { status: 'Not Started', deliveryDate: '', notes: '' }
                            };
                        }
                    });
                    
                    localStorage.setItem('footwearSamples', JSON.stringify(dataToImport));
                    alert('Successfully imported ' + dataToImport.length + ' samples! Page will refresh now.');
                    window.location.reload();
                }
            } catch (error) {
                console.error('Import error:', error);
                alert('Error reading file: ' + error.message + '\n\nMake sure it is a valid JSON backup file exported from this tracker.');
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}


// ========================================
// EXPORT TO EXCEL WITH IMAGES
// ========================================
async function exportToExcel() {
    try {
        if (typeof ExcelJS === 'undefined') {
            alert('Excel library not loaded. Please refresh the page.');
            return;
        }

        const data = localStorage.getItem('footwearSamples');
        if (!data || data === '[]') {
            alert('No data to export!');
            return;
        }
        
        const samples = JSON.parse(data);
        
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Samples');
        
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 12 },
            { header: 'Photo', key: 'photo', width: 15 },
            { header: 'Name', key: 'name', width: 25 },
            { header: 'Client', key: 'client', width: 20 },
            { header: 'Date', key: 'date', width: 15 },
            { header: 'Stage', key: 'stage', width: 15 },
            { header: 'Upper Vendor', key: 'upperV', width: 20 },
            { header: 'Last Vendor', key: 'lastV', width: 20 },
            { header: 'Sole Vendor', key: 'soleV', width: 20 }
        ];
        
        worksheet.getRow(1).font = { bold: true };
        worksheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } };
        
        for (let i = 0; i < samples.length; i++) {
            const s = samples[i];
            const row = worksheet.addRow({
                id: s.id || '',
                name: s.sampleName || '',
                client: s.client || '',
                date: s.dateReceived || '',
                stage: s.currentStage || '',
                upperV: (s.materialDetails && s.materialDetails.upperMaterial) ? s.materialDetails.upperMaterial.vendor : '',
                lastV: (s.materialDetails && s.materialDetails.last) ? s.materialDetails.last.vendor : '',
                soleV: (s.materialDetails && s.materialDetails.sole) ? s.materialDetails.sole.vendor : ''
            });
            
            row.height = 80;
            
            if (s.photos && s.photos.length > 0 && s.photos) {
                try {
                    const img = s.photos.replace(/^data:image\/\w+;base64,/, '');
                    const imageId = workbook.addImage({ base64: img, extension: 'png' });
                    worksheet.addImage(imageId, {
                        tl: { col: 1, row: i + 1 },
                        br: { col: 2, row: i + 2 },
                        editAs: 'oneCell'
                    });
                } catch (e) {
                    console.log('Image error:', e);
                }
            }
        }
        
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Samples_' + new Date().toISOString().split('T') + '.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        alert('Excel exported successfully!');
    } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showView(btn.dataset.view);
        });
    });
    
    setupAddSampleForm();
    updateClientFilters();
    showView('dashboard');
    
    console.log('Application initialized with ' + samples.length + ' samples');
});

// Make functions globally available
window.showView = showView;
window.clearForm = clearForm;
window.exportAllData = exportAllData;
window.showImportDialog = showImportDialog;
window.exportToExcel = exportToExcel;
