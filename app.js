// Enhanced Sample Tracker Application JavaScript with Full Data Persistence

// Application State
let samples = [];
let nextSampleNumber = 6;
let currentSampleId = null;
let deleteTargetId = null;
let pendingSaveData = null;
let currentUserName = '';

// Initial sample data from JSON
const initialSampleData = [
    {
        "id": "FS-001",
        "sampleName": "Classic Oxford Brown",
        "dateReceived": "2025-08-15",
        "client": "Premium Footwear Co.",
        "photos": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="],
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
        "lastEditedDate": "2025-08-17T14:30:00Z",
        "editHistory": [
            { "date": "2025-08-15T09:00:00Z", "user": "Priya Sharma", "action": "Created sample", "details": "Initial sample entry" },
            { "date": "2025-08-16T11:20:00Z", "user": "Rajesh Kumar", "action": "Updated materials", "details": "Added vendor information" },
            { "date": "2025-08-17T14:30:00Z", "user": "Rajesh Kumar", "action": "Updated progress", "details": "Pattern trial completed" }
        ]
    },
    {
        "id": "FS-002", 
        "sampleName": "Casual Sneaker White",
        "dateReceived": "2025-08-16",
        "client": "SportStyle Brand",
        "photos": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="],
        "materialDetails": {
            "upperMaterial": { "vendor": "Technical Fabrics Inc.", "stage": "Ordered", "deliveryDate": "2025-08-25", "notes": "Breathable mesh fabric" },
            "last": { "vendor": "Sport Lasts Co.", "stage": "Sourcing", "deliveryDate": "2025-08-28", "notes": "Athletic last required" },
            "sole": { "vendor": "EVA Solutions", "stage": "Not Started", "deliveryDate": "2025-09-01", "notes": "EVA midsole with rubber outsole" },
            "otherMaterial1": { "name": "Laces", "vendor": "Shoelace Pro", "stage": "Delivered", "deliveryDate": "2025-08-20", "notes": "Flat polyester laces" },
            "otherMaterial2": { "name": "Insole", "vendor": "Comfort Plus", "stage": "Ordered", "deliveryDate": "2025-08-26", "notes": "Memory foam insole" }
        },
        "developmentStages": {
            "patternTrial": { "status": "Not Started", "deliveryDate": "2025-09-03", "notes": "" },
            "upperReady": { "status": "Not Started", "deliveryDate": "2025-09-10", "notes": "" },
            "soleReady": { "status": "Not Started", "deliveryDate": "2025-09-12", "notes": "" },
            "assembly": { "status": "Not Started", "deliveryDate": "2025-09-15", "notes": "" },
            "qualityCheck": { "status": "Not Started", "deliveryDate": "2025-09-18", "notes": "" }
        },
        "readyToShip": false,
        "notes": "Waiting for special fabric delivery from supplier.",
        "currentStage": "Material",
        "lastUpdated": "2025-08-16T09:15:00Z",
        "lastEditedBy": "Amit Patel",
        "lastEditedDate": "2025-08-16T15:45:00Z",
        "editHistory": [
            { "date": "2025-08-16T09:15:00Z", "user": "Priya Sharma", "action": "Created sample", "details": "Initial sample entry" },
            { "date": "2025-08-16T15:45:00Z", "user": "Amit Patel", "action": "Updated materials", "details": "Added material specifications" }
        ]
    },
    {
        "id": "FS-003",
        "sampleName": "Formal Derby Black", 
        "dateReceived": "2025-08-12",
        "client": "Executive Collection",
        "photos": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="],
        "materialDetails": {
            "upperMaterial": { "vendor": "Premium Calf Co.", "stage": "Approved", "deliveryDate": "2025-08-15", "notes": "Black calf leather" },
            "last": { "vendor": "Classic Lasts Ltd.", "stage": "Approved", "deliveryDate": "2025-08-14", "notes": "Formal derby last #23A" },
            "sole": { "vendor": "Leather Sole Works", "stage": "Approved", "deliveryDate": "2025-08-16", "notes": "Full leather sole" },
            "otherMaterial1": { "name": "Lining", "vendor": "Soft Linings Inc.", "stage": "Approved", "deliveryDate": "2025-08-15", "notes": "Sheep leather lining" },
            "otherMaterial2": { "name": "Polish", "vendor": "Shine Masters", "stage": "Approved", "deliveryDate": "2025-08-13", "notes": "High-gloss black polish" }
        },
        "developmentStages": {
            "patternTrial": { "status": "Completed", "deliveryDate": "2025-08-20", "notes": "Perfect fit achieved" },
            "upperReady": { "status": "Completed", "deliveryDate": "2025-08-25", "notes": "Excellent craftsmanship" },
            "soleReady": { "status": "Completed", "deliveryDate": "2025-08-27", "notes": "Proper stitching completed" },
            "assembly": { "status": "Completed", "deliveryDate": "2025-08-30", "notes": "Final assembly done" },
            "qualityCheck": { "status": "Completed", "deliveryDate": "2025-09-01", "notes": "Passed all quality tests" }
        },
        "readyToShip": true,
        "notes": "Excellent quality achieved. Client very satisfied with finish.",
        "currentStage": "Ready to Ship",
        "lastUpdated": "2025-08-17T16:45:00Z",
        "lastEditedBy": "Sanjay Gupta",
        "lastEditedDate": "2025-08-17T16:45:00Z",
        "editHistory": [
            { "date": "2025-08-12T10:30:00Z", "user": "Priya Sharma", "action": "Created sample", "details": "Initial sample entry" },
            { "date": "2025-08-13T14:15:00Z", "user": "Rajesh Kumar", "action": "Updated materials", "details": "All materials approved" },
            { "date": "2025-08-15T09:20:00Z", "user": "Amit Patel", "action": "Updated progress", "details": "Pattern and upper completed" },
            { "date": "2025-08-17T16:45:00Z", "user": "Sanjay Gupta", "action": "Final approval", "details": "Quality check passed, ready to ship" }
        ]
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
            // First time load - use initial data
            samples = [...initialSampleData];
            saveToLocalStorage();
            console.log('Loaded initial sample data');
        }
        
        if (storedNextId) {
            nextSampleNumber = parseInt(storedNextId);
        }
        
        // Ensure all samples have required structure
        samples.forEach(sample => {
            if (!sample.photos) sample.photos = [];
            if (!sample.editHistory) sample.editHistory = [];
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
    return `FS-${String(nextSampleNumber++).padStart(3, '0')}`;
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
    
    // Check for any failures
    const devStages = sample.developmentStages || {};
    if (devStages.patternTrial?.status === 'Failed' || 
        devStages.qualityCheck?.status === 'Failed') {
        return 'Failed';
    }
    
    // Check if all stages are completed
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
    
    // Check if any stage is in progress
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
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
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
    img.style.borderRadius = 'var(--radius-base)';
    img.style.border = '1px solid var(--color-border)';
    
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
    
    // Apply client filter
    const clientFilter = document.getElementById(`${viewType}-client-filter`);
    if (clientFilter && clientFilter.value) {
        filteredSamples = filteredSamples.filter(sample => sample.client === clientFilter.value);
    }
    
    // Apply search filter for list view
    if (viewType === 'list') {
        const searchInput = document.getElementById('search-input');
        if (searchInput && searchInput.value.trim()) {
            const searchTerm = searchInput.value.toLowerCase();
            filteredSamples = filteredSamples.filter(sample => 
                sample.sampleName.toLowerCase().includes(searchTerm) ||
                sample.id.toLowerCase().includes(searchTerm) ||
                sample.client.toLowerCase().includes(searchTerm) ||
                Object.values(sample.materialDetails || {}).some(material =>
                    (material.vendor || '').toLowerCase().includes(searchTerm) ||
                    (material.name || '').toLowerCase().includes(searchTerm)
                )
            );
        }
        
        // Apply stage filter for list view
        const filterStage = document.getElementById('filter-stage');
        if (filterStage && filterStage.value) {
            filteredSamples = filteredSamples.filter(sample => sample.currentStage === filterStage.value);
        }
    }
    
    return filteredSamples;
}

// View Management
function showView(viewName) {
    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Show selected view
    const targetView = document.getElementById(`${viewName}-view`);
    if (targetView) {
        targetView.classList.add('active');
    }
    
    // Update navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`[data-view="${viewName}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Render view content
    switch (viewName) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'list':
            renderExcelView();
            break;
        case 'kanban':
            renderKanbanView();
            break;
        case 'add-sample':
            // Add sample view doesn't need special rendering
            break;
    }
}

// Dashboard Rendering
function renderDashboard() {
    const filteredSamples = getFilteredSamples('dashboard');
    updateStats(filteredSamples);
    renderStageGroups(filteredSamples);
}

function updateStats(filteredSamples) {
    const totalSamples = filteredSamples.length;
    const readySamples = filteredSamples.filter(s => s.readyToShip).length;
    const inProgressSamples = filteredSamples.filter(s => getOverallStatus(s) === 'In Progress').length;
    
    // Calculate average material completion
    const avgMaterialCompletion = totalSamples > 0 
        ? Math.round(filteredSamples.reduce((sum, sample) => sum + calculateMaterialCompletion(sample), 0) / totalSamples)
        : 0;
    
    document.getElementById('total-samples').textContent = totalSamples;
    document.getElementById('ready-samples').textContent = readySamples;
    document.getElementById('in-progress-samples').textContent = inProgressSamples;
    document.getElementById('material-completion').textContent = `${avgMaterialCompletion}%`;
}

function renderStageGroups(filteredSamples) {
    const materialStage = document.getElementById('material-stage-samples');
    const developmentStage = document.getElementById('development-stage-samples');
    const finalStage = document.getElementById('final-stage-samples');
    const readyStage = document.getElementById('ready-stage-samples');
    
    // Clear existing content
    [materialStage, developmentStage, finalStage, readyStage].forEach(container => {
        if (container) container.innerHTML = '';
    });
    
    filteredSamples.forEach(sample => {
        const card = createSampleCard(sample);
        
        switch (sample.currentStage) {
            case 'Material':
                if (materialStage) materialStage.appendChild(card);
                break;
            case 'Development':
                if (developmentStage) developmentStage.appendChild(card);
                break;
            case 'Final':
                if (finalStage) finalStage.appendChild(card);
                break;
            case 'Ready to Ship':
                if (readyStage) readyStage.appendChild(card);
                break;
        }
    });
}

function createSampleCard(sample) {
    const card = document.createElement('div');
    card.className = 'sample-card';
    card.onclick = () => openSampleModal(sample.id);
    
    const status = getOverallStatus(sample);
    const statusClass = getStatusBadgeClass(status);
    const materialCompletion = calculateMaterialCompletion(sample);
    
    // Create photo element - using placeholder emoji instead of circular elements
    let photoElement = '';
    if (sample.photos && sample.photos.length > 0 && sample.photos[0] !== "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==") {
        photoElement = `<img src="${sample.photos[0]}" class="sample-card-photo" alt="Sample photo" onclick="event.stopPropagation(); openSampleModal('${sample.id}')">`;
    } else {
        photoElement = '<div class="sample-card-photo-placeholder">📷</div>';
    }
    
    card.innerHTML = `
        ${photoElement}
        <div class="sample-card-header">
            <h4 class="sample-card-title">${sample.sampleName}</h4>
            <span class="sample-card-id">${sample.id}</span>
        </div>
        <div class="sample-card-client">${sample.client}</div>
        <div class="sample-card-status">
            <span class="sample-card-date">${formatDate(sample.dateReceived)}</span>
            <span class="status-badge ${statusClass}">${status}</span>
        </div>
        <div class="material-completion">
            <div class="material-progress">
                <div class="material-progress-bar" style="width: ${materialCompletion}%"></div>
            </div>
            <div class="material-progress-text">Material: ${materialCompletion}%</div>
        </div>
        <div class="sample-card-actions">
            <button class="btn btn--outline btn-sm" onclick="event.stopPropagation(); openSampleModal('${sample.id}')">Edit</button>
            <button class="btn btn--outline btn-sm" onclick="event.stopPropagation(); confirmDeleteSample('${sample.id}')">Delete</button>
        </div>
    `;
    
    return card;
}

// Excel-like Table View Rendering
function renderExcelView() {
    const tableBody = document.getElementById('excel-table-body');
    if (!tableBody) return;
    
    const filteredSamples = getFilteredSamples('list');
    tableBody.innerHTML = '';
    
    filteredSamples.forEach(sample => {
        const row = document.createElement('tr');
        const status = getOverallStatus(sample);
        const statusClass = getStatusBadgeClass(status);
        
        // Photo thumbnail - using placeholder emoji instead of circular elements
        let photoThumb = '';
        if (sample.photos && sample.photos.length > 0 && sample.photos[0] !== "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==") {
            photoThumb = `<img src="${sample.photos[0]}" class="table-photo-thumb" alt="Sample" onclick="openSampleModal('${sample.id}')">`;
        } else {
            photoThumb = '<div class="table-photo-placeholder">📷</div>';
        }
        
        // Material details summary
        const materials = sample.materialDetails || {};
        const upperMaterial = `${materials.upperMaterial?.vendor || 'N/A'} (${materials.upperMaterial?.stage || 'N/A'})`;
        const lastMaterial = `${materials.last?.vendor || 'N/A'} (${materials.last?.stage || 'N/A'})`;
        const soleMaterial = `${materials.sole?.vendor || 'N/A'} (${materials.sole?.stage || 'N/A'})`;
        const otherMaterials = `${materials.otherMaterial1?.name || 'N/A'}, ${materials.otherMaterial2?.name || 'N/A'}`;
        
        // Development stages summary
        const devStages = sample.developmentStages || {};
        const patternStatus = devStages.patternTrial?.status || 'Not Started';
        const upperStatus = devStages.upperReady?.status || 'Not Started';
        const soleStatus = devStages.soleReady?.status || 'Not Started';
        const assemblyStatus = devStages.assembly?.status || 'Not Started';
        const qualityStatus = devStages.qualityCheck?.status || 'Not Started';
        
        row.innerHTML = `
            <td class="sticky-col"><strong>${sample.id}</strong></td>
            <td class="sticky-col-2"><strong>${sample.sampleName}</strong></td>
            <td>${sample.client}</td>
            <td>${formatDate(sample.dateReceived)}</td>
            <td>${sample.currentStage}</td>
            <td><span class="status-badge ${statusClass}">${status}</span></td>
            <td>${photoThumb}</td>
            <td title="${upperMaterial}">${upperMaterial}</td>
            <td title="${lastMaterial}">${lastMaterial}</td>
            <td title="${soleMaterial}">${soleMaterial}</td>
            <td title="${otherMaterials}">${otherMaterials}</td>
            <td><span class="status-badge ${getStatusBadgeClass(patternStatus)}">${patternStatus}</span></td>
            <td><span class="status-badge ${getStatusBadgeClass(upperStatus)}">${upperStatus}</span></td>
            <td><span class="status-badge ${getStatusBadgeClass(soleStatus)}">${soleStatus}</span></td>
            <td><span class="status-badge ${getStatusBadgeClass(assemblyStatus)}">${assemblyStatus}</span></td>
            <td><span class="status-badge ${getStatusBadgeClass(qualityStatus)}">${qualityStatus}</span></td>
            <td>${sample.lastEditedBy || 'N/A'}</td>
            <td>${sample.lastEditedDate ? formatDateTime(sample.lastEditedDate) : 'N/A'}</td>
            <td>
                <div class="table-actions">
                    <button class="btn btn--outline btn-sm" onclick="openSampleModal('${sample.id}')">Edit</button>
                    <button class="btn btn--outline btn-sm" onclick="confirmDeleteSample('${sample.id}')">Delete</button>
                </div>
            </td>
        `;
        
        // Make row clickable
        row.style.cursor = 'pointer';
        row.addEventListener('click', (e) => {
            if (!e.target.closest('.table-actions') && !e.target.closest('.table-photo-thumb')) {
                openSampleModal(sample.id);
            }
        });
        
        tableBody.appendChild(row);
    });
}

// Kanban View Rendering
function renderKanbanView() {
    const materialCards = document.getElementById('kanban-material');
    const developmentCards = document.getElementById('kanban-development');
    const finalCards = document.getElementById('kanban-final');
    const readyCards = document.getElementById('kanban-ready');
    
    // Clear existing content
    [materialCards, developmentCards, finalCards, readyCards].forEach(container => {
        if (container) container.innerHTML = '';
    });
    
    samples.forEach(sample => {
        const card = createKanbanCard(sample);
        
        switch (sample.currentStage) {
            case 'Material':
                if (materialCards) materialCards.appendChild(card);
                break;
            case 'Development':
                if (developmentCards) developmentCards.appendChild(card);
                break;
            case 'Final':
                if (finalCards) finalCards.appendChild(card);
                break;
            case 'Ready to Ship':
                if (readyCards) readyCards.appendChild(card);
                break;
        }
    });
    
    setupDragAndDrop();
}

function createKanbanCard(sample) {
    const card = document.createElement('div');
    card.className = 'kanban-card';
    card.draggable = true;
    card.dataset.sampleId = sample.id;
    
    const status = getOverallStatus(sample);
    const statusClass = getStatusBadgeClass(status);
    const materialCompletion = calculateMaterialCompletion(sample);
    
    // Create photo element - using placeholder emoji instead of circular elements
    let photoElement = '';
    if (sample.photos && sample.photos.length > 0 && sample.photos[0] !== "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==") {
        photoElement = `<img src="${sample.photos[0]}" class="sample-card-photo" alt="Sample photo">`;
    } else {
        photoElement = '<div class="sample-card-photo-placeholder">📷</div>';
    }
    
    card.innerHTML = `
        ${photoElement}
        <div class="sample-card-header">
            <h4 class="sample-card-title">${sample.sampleName}</h4>
            <span class="sample-card-id">${sample.id}</span>
        </div>
        <div class="sample-card-client">${sample.client}</div>
        <div class="sample-card-status">
            <span class="sample-card-date">${formatDate(sample.dateReceived)}</span>
            <span class="status-badge ${statusClass}">${status}</span>
        </div>
        <div class="material-completion">
            <div class="material-progress">
                <div class="material-progress-bar" style="width: ${materialCompletion}%"></div>
            </div>
            <div class="material-progress-text">Material: ${materialCompletion}%</div>
        </div>
        <div class="sample-card-actions">
            <button class="btn btn--outline btn-sm" onclick="event.stopPropagation(); openSampleModal('${sample.id}')">Edit</button>
            <button class="btn btn--outline btn-sm" onclick="event.stopPropagation(); confirmDeleteSample('${sample.id}')">Delete</button>
        </div>
    `;
    
    // Add click handler for opening modal
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.sample-card-actions')) {
            openSampleModal(sample.id);
        }
    });
    
    return card;
}

function setupDragAndDrop() {
    const cards = document.querySelectorAll('.kanban-card');
    const columns = document.querySelectorAll('.kanban-cards');
    
    cards.forEach(card => {
        card.addEventListener('dragstart', (e) => {
            card.classList.add('dragging');
            e.dataTransfer.setData('text/plain', card.dataset.sampleId);
        });
        
        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
        });
    });
    
    columns.forEach(column => {
        column.addEventListener('dragover', (e) => {
            e.preventDefault();
            column.classList.add('drag-over');
        });
        
        column.addEventListener('dragleave', () => {
            column.classList.remove('drag-over');
        });
        
        column.addEventListener('drop', (e) => {
            e.preventDefault();
            column.classList.remove('drag-over');
            
            const sampleId = e.dataTransfer.getData('text/plain');
            const newStage = column.dataset.stage;
            
            updateSampleStage(sampleId, newStage);
            renderKanbanView();
            saveToLocalStorage();
        });
    });
}

function updateSampleStage(sampleId, newStage) {
    const sample = samples.find(s => s.id === sampleId);
    if (sample) {
        sample.currentStage = newStage;
        sample.lastUpdated = new Date().toISOString();
        
        // Update readyToShip status
        if (newStage === 'Ready to Ship') {
            sample.readyToShip = true;
        } else {
            sample.readyToShip = false;
        }
    }
}

// Tab Management
function switchTab(tabName) {
    // Hide all tab panels
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Show selected tab panel
    const targetPanel = document.getElementById(`${tabName}-tab`);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// Sample Modal Management - Enhanced with Modified By field
function openSampleModal(sampleId) {
    currentSampleId = sampleId;
    const sample = samples.find(s => s.id === sampleId);
    
    if (!sample) return;
    
    // Populate modal with sample data
    document.getElementById('modal-sample-title').textContent = `${sample.sampleName} (${sample.id})`;
    
    // General tab
    document.getElementById('detail-sample-name').textContent = sample.sampleName;
    document.getElementById('detail-sample-id').textContent = sample.id;
    document.getElementById('detail-client').textContent = sample.client;
    document.getElementById('detail-date').textContent = formatDate(sample.dateReceived);
    document.getElementById('detail-last-updated').textContent = formatDateTime(sample.lastUpdated);
    document.getElementById('detail-last-edited-by').textContent = sample.lastEditedBy || 'N/A';
    document.getElementById('detail-current-stage').textContent = sample.currentStage;
    document.getElementById('detail-notes').value = sample.notes || '';
    
    // Materials tab
    if (sample.materialDetails) {
        populateMaterialDetails(sample.materialDetails);
    }
    
    // Development tab
    if (sample.developmentStages) {
        populateDevelopmentStages(sample.developmentStages);
    }
    
    // Photos tab
    populatePhotoGallery(sample.photos || []);
    
    // History tab
    populateEditHistory(sample.editHistory || []);
    
    // Reset to general tab
    switchTab('general');
    
    // Show modal
    const modal = document.getElementById('sample-detail-modal');
    modal.classList.remove('hidden');
    
    // Add "Modified By" requirement notice to footer
    const footer = modal.querySelector('.modal-footer');
    if (footer && !footer.querySelector('.modified-by-notice')) {
        const notice = document.createElement('div');
        notice.className = 'modified-by-notice';
        notice.style.cssText = 'flex: 1; color: var(--color-text-secondary); font-size: var(--font-size-sm); padding-right: var(--space-16);';
        notice.textContent = '* You will be prompted to enter your name before saving changes';
        footer.insertBefore(notice, footer.firstChild);
    }
}

function populateMaterialDetails(materialDetails) {
    const fields = [
        { prefix: 'upper', key: 'upperMaterial' },
        { prefix: 'last', key: 'last' },
        { prefix: 'sole', key: 'sole' },
        { prefix: 'other1', key: 'otherMaterial1' },
        { prefix: 'other2', key: 'otherMaterial2' }
    ];
    
    fields.forEach(field => {
        const material = materialDetails[field.key] || {};
        document.getElementById(`edit-${field.prefix}-vendor`).value = material.vendor || '';
        document.getElementById(`edit-${field.prefix}-stage`).value = material.stage || 'Not Started';
        document.getElementById(`edit-${field.prefix}-delivery-date`).value = material.deliveryDate || '';
        document.getElementById(`edit-${field.prefix}-notes`).value = material.notes || '';
        
        if (field.prefix.startsWith('other')) {
            document.getElementById(`edit-${field.prefix}-name`).value = material.name || '';
        }
    });
}

function populateDevelopmentStages(developmentStages) {
    const stages = [
        { id: 'pattern', key: 'patternTrial' },
        { id: 'upper', key: 'upperReady' },
        { id: 'sole', key: 'soleReady' },
        { id: 'assembly', key: 'assembly' },
        { id: 'quality', key: 'qualityCheck' }
    ];
    
    stages.forEach(stage => {
        const stageData = developmentStages[stage.key] || {};
        document.getElementById(`detail-${stage.id}`).value = stageData.status || 'Not Started';
        document.getElementById(`detail-${stage.id}-delivery`).value = stageData.deliveryDate || '';
        document.getElementById(`detail-${stage.id}-notes`).value = stageData.notes || '';
    });
}

function populatePhotoGallery(photos) {
    const gallery = document.getElementById('modal-photo-gallery');
    gallery.innerHTML = '';
    
    // Filter out the placeholder base64 images
    const realPhotos = photos.filter(photo => 
        photo && photo !== "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
    );
    
    realPhotos.forEach((photo, index) => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.style.position = 'relative';
        
        const img = document.createElement('img');
        img.src = photo;
        img.alt = `Sample photo ${index + 1}`;
        img.onclick = () => {
            // Create fullscreen view
            const fullscreen = document.createElement('div');
            fullscreen.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 2000; display: flex; align-items: center; justify-content: center; cursor: pointer;';
            fullscreen.onclick = () => fullscreen.remove();
            
            const fullImg = document.createElement('img');
            fullImg.src = photo;
            fullImg.style.cssText = 'max-width: 90%; max-height: 90%; object-fit: contain;';
            
            fullscreen.appendChild(fullImg);
            document.body.appendChild(fullscreen);
        };
        
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '×';
        deleteBtn.className = 'photo-delete-btn';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            const sample = samples.find(s => s.id === currentSampleId);
            if (sample && sample.photos) {
                const photoIndex = sample.photos.indexOf(photo);
                if (photoIndex > -1) {
                    sample.photos.splice(photoIndex, 1);
                    populatePhotoGallery(sample.photos);
                    saveToLocalStorage();
                }
            }
        };
        
        photoItem.appendChild(img);
        photoItem.appendChild(deleteBtn);
        gallery.appendChild(photoItem);
    });
    
    if (realPhotos.length === 0) {
        gallery.innerHTML = '<p style="color: var(--color-text-secondary); text-align: center; padding: var(--space-20);">No photos uploaded</p>';
    }
}

function populateEditHistory(editHistory) {
    const historyList = document.getElementById('edit-history-list');
    historyList.innerHTML = '';
    
    if (editHistory.length === 0) {
        historyList.innerHTML = '<p style="color: var(--color-text-secondary);">No edit history available</p>';
        return;
    }
    
    editHistory.slice().reverse().forEach(entry => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-date">${formatDateTime(entry.date)}</div>
            <div class="history-user">${entry.user}</div>
            <div class="history-action">${entry.action}</div>
            <div class="history-details">${entry.details}</div>
        `;
        historyList.appendChild(historyItem);
    });
}

function closeSampleModal() {
    const modal = document.getElementById('sample-detail-modal');
    modal.classList.add('hidden');
    currentSampleId = null;
}

// Enhanced User Name Modal Management with validation
function promptForUserName(saveData) {
    pendingSaveData = saveData;
    const modal = document.getElementById('user-name-modal');
    const input = document.getElementById('user-name-input');
    
    // Pre-fill with current user name if available
    input.value = currentUserName;
    
    // Update modal title to be more specific
    const modalTitle = modal.querySelector('.modal-header h3');
    if (modalTitle) {
        modalTitle.textContent = 'Modified By - Required';
    }
    
    // Update modal message
    const modalMessage = modal.querySelector('.modal-body p');
    if (modalMessage) {
        modalMessage.textContent = 'Please enter your name to track who made these changes:';
    }
    
    modal.classList.remove('hidden');
    input.focus();
    input.select(); // Select existing text for easy replacement
}

function confirmUserName() {
    const input = document.getElementById('user-name-input');
    const userName = input.value.trim();
    
    if (!userName) {
        showToast('Name is required to save changes', 'error');
        input.focus();
        return;
    }
    
    if (userName.length < 2) {
        showToast('Please enter a valid name (at least 2 characters)', 'error');
        input.focus();
        return;
    }
    
    currentUserName = userName;
    const modal = document.getElementById('user-name-modal');
    modal.classList.add('hidden');
    
    if (pendingSaveData) {
        executeSaveWithUserName(userName);
        pendingSaveData = null;
    }
}

function cancelUserName() {
    const modal = document.getElementById('user-name-modal');
    modal.classList.add('hidden');
    pendingSaveData = null;
    showToast('Changes were not saved', 'error');
}

function executeSaveWithUserName(userName) {
    if (!currentSampleId || !pendingSaveData) return;
    
    const sample = samples.find(s => s.id === currentSampleId);
    if (!sample) return;
    
    // Apply changes
    Object.assign(sample, pendingSaveData);
    
    // Update tracking fields
    sample.lastEditedBy = userName;
    sample.lastEditedDate = new Date().toISOString();
    sample.lastUpdated = new Date().toISOString();
    
    // Add to edit history
    if (!sample.editHistory) sample.editHistory = [];
    sample.editHistory.push({
        date: new Date().toISOString(),
        user: userName,
        action: 'Updated sample',
        details: 'Modified sample details via edit dialog'
    });
    
    // Update current stage based on progress
    sample.currentStage = determineCurrentStage(sample);
    
    // Save to localStorage
    saveToLocalStorage();
    
    closeSampleModal();
    
    // Refresh current view
    const currentView = document.querySelector('.nav-btn.active').dataset.view;
    showView(currentView);
    
    showToast(`Sample updated successfully by ${userName}!`);
}

function saveSampleChanges() {
    if (!currentSampleId) return;
    
    const sample = samples.find(s => s.id === currentSampleId);
    if (!sample) return;
    
    // Collect form data
    const saveData = {
        notes: document.getElementById('detail-notes').value,
        readyToShip: document.getElementById('detail-ready-ship') ? 
                     document.getElementById('detail-ready-ship').value === 'true' : 
                     sample.readyToShip,
        materialDetails: {
            upperMaterial: {
                vendor: document.getElementById('edit-upper-vendor').value,
                stage: document.getElementById('edit-upper-stage').value,
                deliveryDate: document.getElementById('edit-upper-delivery-date').value,
                notes: document.getElementById('edit-upper-notes').value
            },
            last: {
                vendor: document.getElementById('edit-last-vendor').value,
                stage: document.getElementById('edit-last-stage').value,
                deliveryDate: document.getElementById('edit-last-delivery-date').value,
                notes: document.getElementById('edit-last-notes').value
            },
            sole: {
                vendor: document.getElementById('edit-sole-vendor').value,
                stage: document.getElementById('edit-sole-stage').value,
                deliveryDate: document.getElementById('edit-sole-delivery-date').value,
                notes: document.getElementById('edit-sole-notes').value
            },
            otherMaterial1: {
                name: document.getElementById('edit-other1-name').value,
                vendor: document.getElementById('edit-other1-vendor').value,
                stage: document.getElementById('edit-other1-stage').value,
                deliveryDate: document.getElementById('edit-other1-delivery-date').value,
                notes: document.getElementById('edit-other1-notes').value
            },
            otherMaterial2: {
                name: document.getElementById('edit-other2-name').value,
                vendor: document.getElementById('edit-other2-vendor').value,
                stage: document.getElementById('edit-other2-stage').value,
                deliveryDate: document.getElementById('edit-other2-delivery-date').value,
                notes: document.getElementById('edit-other2-notes').value
            }
        },
        developmentStages: {
            patternTrial: {
                status: document.getElementById('detail-pattern').value,
                deliveryDate: document.getElementById('detail-pattern-delivery').value,
                notes: document.getElementById('detail-pattern-notes').value
            },
            upperReady: {
                status: document.getElementById('detail-upper').value,
                deliveryDate: document.getElementById('detail-upper-delivery').value,
                notes: document.getElementById('detail-upper-notes').value
            },
            soleReady: {
                status: document.getElementById('detail-sole').value,
                deliveryDate: document.getElementById('detail-sole-delivery').value,
                notes: document.getElementById('detail-sole-notes').value
            },
            assembly: {
                status: document.getElementById('detail-assembly').value,
                deliveryDate: document.getElementById('detail-assembly-delivery').value,
                notes: document.getElementById('detail-assembly-notes').value
            },
            qualityCheck: {
                status: document.getElementById('detail-quality').value,
                deliveryDate: document.getElementById('detail-quality-delivery').value,
                notes: document.getElementById('detail-quality-notes').value
            }
        }
    };
    
    // Always prompt for user name when saving changes
    promptForUserName(saveData);
}

// Delete Confirmation Modal Management
function confirmDeleteSample(sampleId) {
    deleteTargetId = sampleId;
    const sample = samples.find(s => s.id === sampleId);
    
    if (!sample) return;
    
    document.getElementById('delete-sample-name').textContent = sample.sampleName;
    document.getElementById('delete-sample-id').textContent = sample.id;
    
    const modal = document.getElementById('delete-modal');
    modal.classList.remove('hidden');
}

function confirmDelete() {
    if (!deleteTargetId) return;
    
    const index = samples.findIndex(s => s.id === deleteTargetId);
    if (index !== -1) {
        samples.splice(index, 1);
        
        // Save to localStorage
        saveToLocalStorage();
        
        const modal = document.getElementById('delete-modal');
        modal.classList.add('hidden');
        
        // Refresh current view
        const currentView = document.querySelector('.nav-btn.active').dataset.view;
        showView(currentView);
        updateClientFilters();
        
        showToast('Sample deleted successfully!');
    }
    
    deleteTargetId = null;
}

function cancelDelete() {
    const modal = document.getElementById('delete-modal');
    modal.classList.add('hidden');
    deleteTargetId = null;
}

// Add Sample Form Management
function setupAddSampleForm() {
    const form = document.getElementById('add-sample-form');
    const photoInput = document.getElementById('sample-photos');
    const cameraButton = document.getElementById('camera-button');
    const cameraInput = document.getElementById('camera-input');
    const previewContainer = document.getElementById('photo-preview');
    
    if (!form) return;
    
    // Set default date to today
    const dateInput = document.getElementById('date-received');
    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }
    
    // Show camera button on mobile/touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        if (cameraButton) cameraButton.style.display = 'inline-flex';
    }
    
    // Handle camera button click
    if (cameraButton && cameraInput) {
        cameraButton.onclick = () => cameraInput.click();
    }
    
    // Handle photo preview for both file input and camera
    [photoInput, cameraInput].forEach(input => {
        if (input && previewContainer) {
            input.addEventListener('change', async (e) => {
                const files = Array.from(e.target.files);
                for (const file of files) {
                    if (file.type.startsWith('image/')) {
                        try {
                            const base64 = await convertFileToBase64(file);
                            createPhotoPreview(base64, 0, previewContainer);
                        } catch (error) {
                            console.error('Error converting file to base64:', error);
                        }
                    }
                }
            });
        }
    });
    
    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate required "Created By" field
        const createdByField = document.getElementById('created-by');
        if (!createdByField.value.trim()) {
            showToast('Please enter your name in the "Created By" field', 'error');
            createdByField.focus();
            return;
        }
        
        // Collect all photos from preview
        const photoElements = previewContainer.querySelectorAll('.photo-preview');
        const photos = Array.from(photoElements).map(img => img.src);
        
        const newSample = {
            id: generateSampleId(),
            sampleName: document.getElementById('sample-name').value,
            client: document.getElementById('client-name').value,
            dateReceived: document.getElementById('date-received').value,
            currentStage: document.getElementById('initial-stage').value,
            photos: photos,
            notes: document.getElementById('initial-notes').value,
            lastUpdated: new Date().toISOString(),
            lastEditedBy: createdByField.value.trim(),
            lastEditedDate: new Date().toISOString(),
            editHistory: [{
                date: new Date().toISOString(),
                user: createdByField.value.trim(),
                action: 'Created sample',
                details: 'Initial sample entry'
            }],
            
            // Initialize material details with delivery dates
            materialDetails: {
                upperMaterial: {
                    vendor: document.getElementById('upper-vendor').value,
                    stage: document.getElementById('upper-stage').value,
                    deliveryDate: document.getElementById('upper-delivery-date').value,
                    notes: document.getElementById('upper-notes').value
                },
                last: {
                    vendor: document.getElementById('last-vendor').value,
                    stage: document.getElementById('last-stage').value,
                    deliveryDate: document.getElementById('last-delivery-date').value,
                    notes: document.getElementById('last-notes').value
                },
                sole: {
                    vendor: document.getElementById('sole-vendor').value,
                    stage: document.getElementById('sole-stage').value,
                    deliveryDate: document.getElementById('sole-delivery-date').value,
                    notes: document.getElementById('sole-notes').value
                },
                otherMaterial1: {
                    name: document.getElementById('other1-name').value,
                    vendor: document.getElementById('other1-vendor').value,
                    stage: document.getElementById('other1-stage').value,
                    deliveryDate: document.getElementById('other1-delivery-date').value,
                    notes: document.getElementById('other1-notes').value
                },
                otherMaterial2: {
                    name: document.getElementById('other2-name').value,
                    vendor: document.getElementById('other2-vendor').value,
                    stage: document.getElementById('other2-stage').value,
                    deliveryDate: document.getElementById('other2-delivery-date').value,
                    notes: document.getElementById('other2-notes').value
                }
            },
            
            // Initialize development stages with delivery dates
            developmentStages: {
                patternTrial: {
                    status: 'Not Started',
                    deliveryDate: document.getElementById('pattern-delivery-date').value,
                    notes: document.getElementById('pattern-notes').value
                },
                upperReady: {
                    status: 'Not Started',
                    deliveryDate: document.getElementById('upper-ready-delivery-date').value,
                    notes: document.getElementById('upper-ready-notes').value
                },
                soleReady: {
                    status: 'Not Started',
                    deliveryDate: document.getElementById('sole-ready-delivery-date').value,
                    notes: document.getElementById('sole-ready-notes').value
                },
                assembly: {
                    status: 'Not Started',
                    deliveryDate: document.getElementById('assembly-delivery-date').value,
                    notes: document.getElementById('assembly-notes').value
                },
                qualityCheck: {
                    status: 'Not Started',
                    deliveryDate: document.getElementById('quality-delivery-date').value,
                    notes: document.getElementById('quality-notes').value
                }
            },
            
            readyToShip: false
        };
        
        samples.push(newSample);
        
        // Save to localStorage
        saveToLocalStorage();
        
        // Clear form and show success
        clearForm();
        updateClientFilters();
        
        showToast(`Sample added successfully by ${createdByField.value.trim()}!`);
        
        // Switch to dashboard view
        showView('dashboard');
    });
}

function clearForm() {
    const form = document.getElementById('add-sample-form');
    const previewContainer = document.getElementById('photo-preview');
    const dateInput = document.getElementById('date-received');
    
    if (form) form.reset();
    if (previewContainer) previewContainer.innerHTML = '';
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
}

// Setup Modal Photo Upload
function setupModalPhotoUpload() {
    const photoInput = document.getElementById('modal-photo-input');
    const cameraButton = document.getElementById('modal-camera-button');
    const cameraInput = document.getElementById('modal-camera-input');
    
    // Show camera button on mobile/touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        if (cameraButton) cameraButton.style.display = 'inline-flex';
    }
    
    // Handle camera button click
    if (cameraButton && cameraInput) {
        cameraButton.onclick = () => cameraInput.click();
    }
    
    // Handle photo upload for both inputs
    [photoInput, cameraInput].forEach(input => {
        if (input) {
            input.addEventListener('change', async (e) => {
                if (!currentSampleId) return;
                
                const sample = samples.find(s => s.id === currentSampleId);
                if (!sample) return;
                
                const files = Array.from(e.target.files);
                for (const file of files) {
                    if (file.type.startsWith('image/')) {
                        try {
                            const base64 = await convertFileToBase64(file);
                            if (!sample.photos) sample.photos = [];
                            sample.photos.push(base64);
                        } catch (error) {
                            console.error('Error converting file to base64:', error);
                        }
                    }
                }
                
                // Update gallery and save
                populatePhotoGallery(sample.photos);
                saveToLocalStorage();
                
                // Clear input
                input.value = '';
                
                showToast('Photos uploaded successfully!');
            });
        }
    });
}

// Export Functionality
function exportFilteredSamples(viewType) {
    const filteredSamples = getFilteredSamples(viewType);
    
    if (filteredSamples.length === 0) {
        showToast('No samples to export', 'error');
        return;
    }
    
    const headers = [
        'Sample ID', 'Sample Name', 'Client', 'Date Received', 'Current Stage', 'Status',
        'Upper Material Vendor', 'Upper Material Stage', 'Upper Material Delivery', 'Upper Material Notes',
        'Last Vendor', 'Last Stage', 'Last Delivery', 'Last Notes',
        'Sole Vendor', 'Sole Stage', 'Sole Delivery', 'Sole Notes',
        'Other Material 1 Name', 'Other Material 1 Vendor', 'Other Material 1 Stage', 'Other Material 1 Delivery',
        'Other Material 2 Name', 'Other Material 2 Vendor', 'Other Material 2 Stage', 'Other Material 2 Delivery',
        'Pattern Trial Status', 'Pattern Trial Delivery', 'Upper Ready Status', 'Upper Ready Delivery',
        'Sole Ready Status', 'Sole Ready Delivery', 'Assembly Status', 'Assembly Delivery',
        'Quality Check Status', 'Quality Check Delivery', 'Ready to Ship',
        'Last Edited By', 'Last Edited Date', 'Notes'
    ];
    
    const csvContent = [
        headers.join(','),
        ...filteredSamples.map(sample => {
            const materials = sample.materialDetails || {};
            const devStages = sample.developmentStages || {};
            
            return [
                sample.id,
                `"${sample.sampleName}"`,
                `"${sample.client}"`,
                sample.dateReceived,
                sample.currentStage,
                `"${getOverallStatus(sample)}"`,
                `"${materials.upperMaterial?.vendor || ''}"`,
                materials.upperMaterial?.stage || '',
                materials.upperMaterial?.deliveryDate || '',
                `"${materials.upperMaterial?.notes || ''}"`,
                `"${materials.last?.vendor || ''}"`,
                materials.last?.stage || '',
                materials.last?.deliveryDate || '',
                `"${materials.last?.notes || ''}"`,
                `"${materials.sole?.vendor || ''}"`,
                materials.sole?.stage || '',
                materials.sole?.deliveryDate || '',
                `"${materials.sole?.notes || ''}"`,
                `"${materials.otherMaterial1?.name || ''}"`,
                `"${materials.otherMaterial1?.vendor || ''}"`,
                materials.otherMaterial1?.stage || '',
                materials.otherMaterial1?.deliveryDate || '',
                `"${materials.otherMaterial2?.name || ''}"`,
                `"${materials.otherMaterial2?.vendor || ''}"`,
                materials.otherMaterial2?.stage || '',
                materials.otherMaterial2?.deliveryDate || '',
                devStages.patternTrial?.status || 'Not Started',
                devStages.patternTrial?.deliveryDate || '',
                devStages.upperReady?.status || 'Not Started',
                devStages.upperReady?.deliveryDate || '',
                devStages.soleReady?.status || 'Not Started',
                devStages.soleReady?.deliveryDate || '',
                devStages.assembly?.status || 'Not Started',
                devStages.assembly?.deliveryDate || '',
                devStages.qualityCheck?.status || 'Not Started',
                devStages.qualityCheck?.deliveryDate || '',
                sample.readyToShip ? 'Yes' : 'No',
                `"${sample.lastEditedBy || ''}"`,
                sample.lastEditedDate || '',
                `"${sample.notes || ''}"`
            ].join(',');
        })
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    const clientFilter = document.getElementById(`${viewType}-client-filter`);
    const clientSuffix = clientFilter && clientFilter.value ? `_${clientFilter.value.replace(/[^a-zA-Z0-9]/g, '_')}` : '';
    
    a.download = `footwear_samples_complete${clientSuffix}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast(`Exported ${filteredSamples.length} samples to Excel`);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Load data from localStorage
    loadFromLocalStorage();
    
    // Navigation event listeners
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showView(btn.dataset.view);
        });
    });
    
    // Tab event listeners
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(btn.dataset.tab);
        });
    });
    
    // Filter event listeners
    const searchInput = document.getElementById('search-input');
    const filterStage = document.getElementById('filter-stage');
    const dashboardClientFilter = document.getElementById('dashboard-client-filter');
    const listClientFilter = document.getElementById('list-client-filter');
    
    if (searchInput) searchInput.addEventListener('input', renderExcelView);
    if (filterStage) filterStage.addEventListener('change', renderExcelView);
    if (dashboardClientFilter) dashboardClientFilter.addEventListener('change', renderDashboard);
    if (listClientFilter) listClientFilter.addEventListener('change', renderExcelView);
    
    // Setup forms
    setupAddSampleForm();
    setupModalPhotoUpload();
    
    // Update client filters
    updateClientFilters();
    
    // Initialize with dashboard view
    showView('dashboard');
    
    // Modal close on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    });
    
    // User name input enter key
    const userNameInput = document.getElementById('user-name-input');
    if (userNameInput) {
        userNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                confirmUserName();
            }
        });
    }
    
    console.log('Application initialized with', samples.length, 'samples');
});

// Make functions globally available
window.showView = showView;
window.switchTab = switchTab;
window.openSampleModal = openSampleModal;
window.closeSampleModal = closeSampleModal;
window.saveSampleChanges = saveSampleChanges;
window.confirmDeleteSample = confirmDeleteSample;
window.confirmDelete = confirmDelete;
window.cancelDelete = cancelDelete;
window.confirmUserName = confirmUserName;
window.cancelUserName = cancelUserName;
window.clearForm = clearForm;
window.exportFilteredSamples = exportFilteredSamples;
window.exportAllData = exportAllData;
window.showImportDialog = showImportDialog;
window.exportToExcel = exportToExcel;

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
        
        const dateStr = new Date().toISOString().split('T')[0];
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
                
                if (!importData.data || !Array.isArray(importData.data)) {
                    alert('Invalid file format!');
                    return;
                }
                
                const message = 'Import ' + importData.sampleCount + ' samples?\n\n' +
                               'This will REPLACE all your current data.\n\n' +
                               'Click OK to continue or Cancel to abort.';
                
                if (confirm(message)) {
                    // Add missing fields for compatibility
                    importData.data.forEach(function(sample) {
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
                    
                    localStorage.setItem('footwearSamples', JSON.stringify(importData.data));
                    
                    alert('Successfully imported ' + importData.data.length + ' samples! Page will refresh now.');
                    
                    window.location.reload();
                }
            } catch (error) {
                console.error('Import error:', error);
                alert('Error reading file. Make sure it is a valid JSON backup file.');
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
        alert('Preparing Excel file... Please wait.');
        
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
            
            if (s.photos && s.photos.length > 0 && s.photos[0]) {
                try {
                    const img = s.photos[0].replace(/^data:image\/\w+;base64,/, '');
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
        link.download = 'Samples_' + new Date().toISOString().split('T')[0] + '.xlsx';
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
