// Enhanced Sample Tracker Application JavaScript

// Application State
let samples = [
    {
        id: "FS-001",
        sampleName: "Classic Oxford Brown",
        dateReceived: "2025-08-15",
        client: "Premium Footwear Co.",
        photos: ["sample1_1.jpg", "sample1_2.jpg"],
        materialDetails: {
            upperMaterial: { vendor: "Italian Leather Co.", stage: "Approved", notes: "Premium full-grain leather" },
            last: { vendor: "Precision Lasts Ltd.", stage: "Delivered", notes: "Custom last #47B" },
            sole: { vendor: "Vibram India", stage: "Quality Check", notes: "Leather sole with rubber heel" },
            otherMaterial1: { name: "Thread", vendor: "Coats Thread", stage: "Delivered", notes: "Polyester thread #40" },
            otherMaterial2: { name: "Hardware", vendor: "YKK Fastening", stage: "Approved", notes: "Brass eyelets and hooks" }
        },
        patternTrial: "Completed",
        upperReady: "In Progress",
        soleReady: "Not Started",
        assembly: "Not Started",
        qualityCheck: "Not Started",
        readyToShip: false,
        notes: "High-quality leather sourced. Pattern approved on first trial.",
        currentStage: "Development",
        lastUpdated: "2025-08-17T14:30:00Z",
        lastEditedBy: "Rajesh Kumar",
        lastEditedDate: "2025-08-17T14:30:00Z",
        editHistory: [
            { date: "2025-08-15T09:00:00Z", user: "Priya Sharma", action: "Created sample", details: "Initial sample entry" },
            { date: "2025-08-16T11:20:00Z", user: "Rajesh Kumar", action: "Updated materials", details: "Added vendor information" },
            { date: "2025-08-17T14:30:00Z", user: "Rajesh Kumar", action: "Updated progress", details: "Pattern trial completed" }
        ]
    },
    {
        id: "FS-002", 
        sampleName: "Casual Sneaker White",
        dateReceived: "2025-08-16",
        client: "SportStyle Brand",
        photos: ["sample2_1.jpg"],
        materialDetails: {
            upperMaterial: { vendor: "Technical Fabrics Inc.", stage: "Ordered", notes: "Breathable mesh fabric" },
            last: { vendor: "Sport Lasts Co.", stage: "Sourcing", notes: "Athletic last required" },
            sole: { vendor: "EVA Solutions", stage: "Not Started", notes: "EVA midsole with rubber outsole" },
            otherMaterial1: { name: "Laces", vendor: "Shoelace Pro", stage: "Delivered", notes: "Flat polyester laces" },
            otherMaterial2: { name: "Insole", vendor: "Comfort Plus", stage: "Ordered", notes: "Memory foam insole" }
        },
        patternTrial: "Not Started",
        upperReady: "Not Started",
        soleReady: "Not Started",
        assembly: "Not Started",
        qualityCheck: "Not Started",
        readyToShip: false,
        notes: "Waiting for special fabric delivery from supplier.",
        currentStage: "Material",
        lastUpdated: "2025-08-16T09:15:00Z",
        lastEditedBy: "Amit Patel",
        lastEditedDate: "2025-08-16T15:45:00Z",
        editHistory: [
            { date: "2025-08-16T09:15:00Z", user: "Priya Sharma", action: "Created sample", details: "Initial sample entry" },
            { date: "2025-08-16T15:45:00Z", user: "Amit Patel", action: "Updated materials", details: "Added material specifications" }
        ]
    },
    {
        id: "FS-003",
        sampleName: "Formal Derby Black", 
        dateReceived: "2025-08-12",
        client: "Executive Collection",
        photos: ["sample3_1.jpg", "sample3_2.jpg", "sample3_3.jpg"],
        materialDetails: {
            upperMaterial: { vendor: "Premium Calf Co.", stage: "Approved", notes: "Black calf leather" },
            last: { vendor: "Classic Lasts Ltd.", stage: "Approved", notes: "Formal derby last #23A" },
            sole: { vendor: "Leather Sole Works", stage: "Approved", notes: "Full leather sole" },
            otherMaterial1: { name: "Lining", vendor: "Soft Linings Inc.", stage: "Approved", notes: "Sheep leather lining" },
            otherMaterial2: { name: "Polish", vendor: "Shine Masters", stage: "Approved", notes: "High-gloss black polish" }
        },
        patternTrial: "Completed",
        upperReady: "Completed",
        soleReady: "Completed", 
        assembly: "Completed",
        qualityCheck: "Completed",
        readyToShip: true,
        notes: "Excellent quality achieved. Client very satisfied with finish.",
        currentStage: "Ready to Ship",
        lastUpdated: "2025-08-17T16:45:00Z",
        lastEditedBy: "Sanjay Gupta",
        lastEditedDate: "2025-08-17T16:45:00Z",
        editHistory: [
            { date: "2025-08-12T10:30:00Z", user: "Priya Sharma", action: "Created sample", details: "Initial sample entry" },
            { date: "2025-08-13T14:15:00Z", user: "Rajesh Kumar", action: "Updated materials", details: "All materials approved" },
            { date: "2025-08-15T09:20:00Z", user: "Amit Patel", action: "Updated progress", details: "Pattern and upper completed" },
            { date: "2025-08-17T16:45:00Z", user: "Sanjay Gupta", action: "Final approval", details: "Quality check passed, ready to ship" }
        ]
    },
    {
        id: "FS-004",
        sampleName: "Summer Sandal Tan",
        dateReceived: "2025-08-14", 
        client: "Beach Comfort Ltd.",
        photos: ["sample4_1.jpg"],
        materialDetails: {
            upperMaterial: { vendor: "Tan Leather Co.", stage: "Approved", notes: "Natural tan leather" },
            last: { vendor: "Sandal Lasts Pro", stage: "Quality Check", notes: "Open-toe sandal last" },
            sole: { vendor: "Rubber Works", stage: "Delivered", notes: "Anti-slip rubber sole" },
            otherMaterial1: { name: "Buckles", vendor: "Metal Hardware Ltd.", stage: "Approved", notes: "Brass buckles" },
            otherMaterial2: { name: "Padding", vendor: "Comfort Foam", stage: "Approved", notes: "Heel padding" }
        },
        patternTrial: "Failed",
        upperReady: "Not Started",
        soleReady: "In Progress",
        assembly: "Not Started", 
        qualityCheck: "Not Started",
        readyToShip: false,
        notes: "Pattern trial failed - strap width needs adjustment. Redesigning now.",
        currentStage: "Development",
        lastUpdated: "2025-08-16T11:20:00Z",
        lastEditedBy: "Design Team Lead",
        lastEditedDate: "2025-08-16T11:20:00Z",
        editHistory: [
            { date: "2025-08-14T08:45:00Z", user: "Priya Sharma", action: "Created sample", details: "Initial sample entry" },
            { date: "2025-08-15T16:30:00Z", user: "Rajesh Kumar", action: "Pattern trial", details: "First pattern trial failed" },
            { date: "2025-08-16T11:20:00Z", user: "Design Team Lead", action: "Redesign initiated", details: "Adjusting strap width" }
        ]
    },
    {
        id: "FS-005",
        sampleName: "Athletic Runner Blue",
        dateReceived: "2025-08-17",
        client: "Marathon Sports",
        photos: ["sample5_1.jpg", "sample5_2.jpg"],
        materialDetails: {
            upperMaterial: { vendor: "Technical Textiles", stage: "Sourcing", notes: "Moisture-wicking mesh" },
            last: { vendor: "Running Lasts Co.", stage: "Not Started", notes: "Performance running last needed" },
            sole: { vendor: "Cushion Tech", stage: "Not Started", notes: "Air cushion technology" },
            otherMaterial1: { name: "Reflective Strips", vendor: "Safety First", stage: "Sourcing", notes: "3M reflective material" },
            otherMaterial2: { name: "Heel Counter", vendor: "Support Systems", stage: "Not Started", notes: "Rigid heel support" }
        },
        patternTrial: "Not Started",
        upperReady: "Not Started",
        soleReady: "Not Started",
        assembly: "Not Started",
        qualityCheck: "Not Started", 
        readyToShip: false,
        notes: "Special breathable mesh material being evaluated.",
        currentStage: "Material",
        lastUpdated: "2025-08-17T10:00:00Z",
        lastEditedBy: "Material Specialist",
        lastEditedDate: "2025-08-17T10:00:00Z",
        editHistory: [
            { date: "2025-08-17T08:15:00Z", user: "Priya Sharma", action: "Created sample", details: "Initial sample entry" },
            { date: "2025-08-17T10:00:00Z", user: "Material Specialist", action: "Material research", details: "Evaluating technical materials" }
        ]
    }
];

let nextSampleNumber = 6;
let currentSampleId = null;
let deleteTargetId = null;
let pendingSaveData = null;
let currentUserName = '';

// Utility Functions
function generateSampleId() {
    return `FS-${String(nextSampleNumber++).padStart(3, '0')}`;
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatDateTime(dateString) {
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
    
    if (sample.qualityCheck === 'Completed' || sample.qualityCheck === 'In Progress' || sample.qualityCheck === 'Failed') {
        return 'Final';
    }
    
    if (sample.patternTrial === 'Completed' || sample.patternTrial === 'In Progress' || sample.patternTrial === 'Failed' ||
        sample.upperReady === 'Completed' || sample.upperReady === 'In Progress' ||
        sample.soleReady === 'Completed' || sample.soleReady === 'In Progress' ||
        sample.assembly === 'Completed' || sample.assembly === 'In Progress') {
        return 'Development';
    }
    
    return 'Material';
}

function getOverallStatus(sample) {
    if (sample.readyToShip) {
        return 'Ready to Ship';
    }
    
    // Check for any failures
    if (sample.patternTrial === 'Failed' || sample.qualityCheck === 'Failed') {
        return 'Failed';
    }
    
    // Check if all stages are completed
    const materialCompleted = Object.values(sample.materialDetails || {}).every(material => 
        material.stage === 'Approved' || material.stage === 'Delivered'
    );
    
    const developmentCompleted = sample.patternTrial === 'Completed' &&
                               sample.upperReady === 'Completed' &&
                               sample.soleReady === 'Completed' &&
                               sample.assembly === 'Completed';
    
    if (materialCompleted && developmentCompleted && sample.qualityCheck === 'Completed') {
        return 'Completed';
    }
    
    // Check if any stage is in progress
    const anyInProgress = sample.patternTrial === 'In Progress' ||
                         sample.upperReady === 'In Progress' ||
                         sample.soleReady === 'In Progress' ||
                         sample.assembly === 'In Progress' ||
                         sample.qualityCheck === 'In Progress' ||
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
                    material.vendor.toLowerCase().includes(searchTerm) ||
                    material.name?.toLowerCase().includes(searchTerm)
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
            renderListView();
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
    
    const status = getOverallStatus(sample);
    const statusClass = getStatusBadgeClass(status);
    const materialCompletion = calculateMaterialCompletion(sample);
    
    card.innerHTML = `
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
            <button class="btn btn--outline btn-sm" onclick="openSampleModal('${sample.id}')">Edit</button>
            <button class="btn btn--outline btn-sm" onclick="confirmDeleteSample('${sample.id}')">Delete</button>
        </div>
    `;
    
    return card;
}

// List View Rendering
function renderListView() {
    const tableBody = document.getElementById('samples-table-body');
    if (!tableBody) return;
    
    const filteredSamples = getFilteredSamples('list');
    tableBody.innerHTML = '';
    
    filteredSamples.forEach(sample => {
        const row = document.createElement('tr');
        const status = getOverallStatus(sample);
        const statusClass = getStatusBadgeClass(status);
        
        row.innerHTML = `
            <td>${sample.id}</td>
            <td>${sample.sampleName}</td>
            <td>${sample.client}</td>
            <td>${formatDate(sample.dateReceived)}</td>
            <td>${sample.currentStage}</td>
            <td><span class="status-badge ${statusClass}">${status}</span></td>
            <td>${sample.lastEditedBy || 'N/A'}</td>
            <td>${sample.lastEditedDate ? formatDateTime(sample.lastEditedDate) : 'N/A'}</td>
            <td>
                <div class="table-actions">
                    <button class="btn btn--outline btn-sm" onclick="openSampleModal('${sample.id}')">Edit</button>
                    <button class="btn btn--outline btn-sm" onclick="confirmDeleteSample('${sample.id}')">Delete</button>
                </div>
            </td>
        `;
        
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
    
    card.innerHTML = `
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
            <button class="btn btn--outline btn-sm" onclick="openSampleModal('${sample.id}')">Edit</button>
            <button class="btn btn--outline btn-sm" onclick="confirmDeleteSample('${sample.id}')">Delete</button>
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

// Sample Modal Management
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
    document.getElementById('detail-notes').value = sample.notes;
    
    // Materials tab
    if (sample.materialDetails) {
        populateMaterialDetails(sample.materialDetails);
    }
    
    // Development tab
    document.getElementById('detail-pattern').value = sample.patternTrial;
    document.getElementById('detail-upper').value = sample.upperReady;
    document.getElementById('detail-sole').value = sample.soleReady;
    document.getElementById('detail-assembly').value = sample.assembly;
    document.getElementById('detail-quality').value = sample.qualityCheck;
    document.getElementById('detail-ready-ship').value = sample.readyToShip.toString();
    
    // History tab
    populateEditHistory(sample.editHistory || []);
    
    // Populate photo gallery
    const gallery = document.getElementById('detail-photo-gallery');
    gallery.innerHTML = '';
    
    if (sample.photos && sample.photos.length > 0) {
        sample.photos.forEach(photo => {
            const img = document.createElement('div');
            img.className = 'photo-placeholder';
            img.innerHTML = `<div style="width: 60px; height: 60px; background: var(--color-bg-1); border-radius: var(--radius-base); display: flex; align-items: center; justify-content: center; font-size: var(--font-size-xs); color: var(--color-text-secondary);">📷</div>`;
            gallery.appendChild(img);
        });
    } else {
        gallery.innerHTML = '<p style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">No photos uploaded</p>';
    }
    
    // Reset to general tab
    switchTab('general');
    
    // Show modal
    const modal = document.getElementById('sample-detail-modal');
    modal.classList.remove('hidden');
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
        document.getElementById(`edit-${field.prefix}-notes`).value = material.notes || '';
        
        if (field.prefix.startsWith('other')) {
            document.getElementById(`edit-${field.prefix}-name`).value = material.name || '';
        }
    });
}

function populateEditHistory(editHistory) {
    const historyList = document.getElementById('edit-history-list');
    historyList.innerHTML = '';
    
    if (editHistory.length === 0) {
        historyList.innerHTML = '<p style="color: var(--color-text-secondary);">No edit history available</p>';
        return;
    }
    
    editHistory.reverse().forEach(entry => {
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

// User Name Modal Management
function promptForUserName(saveData) {
    pendingSaveData = saveData;
    const modal = document.getElementById('user-name-modal');
    const input = document.getElementById('user-name-input');
    input.value = currentUserName;
    modal.classList.remove('hidden');
    input.focus();
}

function confirmUserName() {
    const input = document.getElementById('user-name-input');
    const userName = input.value.trim();
    
    if (!userName) {
        showToast('Please enter your name', 'error');
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
        details: 'Modified sample details'
    });
    
    // Update current stage based on progress
    sample.currentStage = determineCurrentStage(sample);
    
    closeSampleModal();
    
    // Refresh current view
    const currentView = document.querySelector('.nav-btn.active').dataset.view;
    showView(currentView);
    
    showToast('Sample updated successfully!');
}

function saveSampleChanges() {
    if (!currentSampleId) return;
    
    const sample = samples.find(s => s.id === currentSampleId);
    if (!sample) return;
    
    // Collect form data
    const saveData = {
        notes: document.getElementById('detail-notes').value,
        patternTrial: document.getElementById('detail-pattern').value,
        upperReady: document.getElementById('detail-upper').value,
        soleReady: document.getElementById('detail-sole').value,
        assembly: document.getElementById('detail-assembly').value,
        qualityCheck: document.getElementById('detail-quality').value,
        readyToShip: document.getElementById('detail-ready-ship').value === 'true',
        materialDetails: {
            upperMaterial: {
                vendor: document.getElementById('edit-upper-vendor').value,
                stage: document.getElementById('edit-upper-stage').value,
                notes: document.getElementById('edit-upper-notes').value
            },
            last: {
                vendor: document.getElementById('edit-last-vendor').value,
                stage: document.getElementById('edit-last-stage').value,
                notes: document.getElementById('edit-last-notes').value
            },
            sole: {
                vendor: document.getElementById('edit-sole-vendor').value,
                stage: document.getElementById('edit-sole-stage').value,
                notes: document.getElementById('edit-sole-notes').value
            },
            otherMaterial1: {
                name: document.getElementById('edit-other1-name').value,
                vendor: document.getElementById('edit-other1-vendor').value,
                stage: document.getElementById('edit-other1-stage').value,
                notes: document.getElementById('edit-other1-notes').value
            },
            otherMaterial2: {
                name: document.getElementById('edit-other2-name').value,
                vendor: document.getElementById('edit-other2-vendor').value,
                stage: document.getElementById('edit-other2-stage').value,
                notes: document.getElementById('edit-other2-notes').value
            }
        }
    };
    
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
    const previewContainer = document.getElementById('photo-preview');
    
    if (!form) return;
    
    // Set default date to today
    const dateInput = document.getElementById('date-received');
    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }
    
    // Handle photo preview
    if (photoInput && previewContainer) {
        photoInput.addEventListener('change', (e) => {
            previewContainer.innerHTML = '';
            
            Array.from(e.target.files).forEach(file => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.className = 'photo-preview';
                        previewContainer.appendChild(img);
                    };
                    reader.readAsDataURL(file);
                }
            });
        });
    }
    
    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newSample = {
            id: generateSampleId(),
            sampleName: document.getElementById('sample-name').value,
            client: document.getElementById('client-name').value,
            dateReceived: document.getElementById('date-received').value,
            currentStage: document.getElementById('initial-stage').value,
            photos: photoInput ? Array.from(photoInput.files).map(file => file.name) : [],
            notes: document.getElementById('initial-notes').value,
            lastUpdated: new Date().toISOString(),
            lastEditedBy: 'System',
            lastEditedDate: new Date().toISOString(),
            editHistory: [{
                date: new Date().toISOString(),
                user: 'System',
                action: 'Created sample',
                details: 'Initial sample entry'
            }],
            
            // Initialize material details
            materialDetails: {
                upperMaterial: {
                    vendor: document.getElementById('upper-vendor').value,
                    stage: document.getElementById('upper-stage').value,
                    notes: document.getElementById('upper-notes').value
                },
                last: {
                    vendor: document.getElementById('last-vendor').value,
                    stage: document.getElementById('last-stage').value,
                    notes: document.getElementById('last-notes').value
                },
                sole: {
                    vendor: document.getElementById('sole-vendor').value,
                    stage: document.getElementById('sole-stage').value,
                    notes: document.getElementById('sole-notes').value
                },
                otherMaterial1: {
                    name: document.getElementById('other1-name').value,
                    vendor: document.getElementById('other1-vendor').value,
                    stage: document.getElementById('other1-stage').value,
                    notes: document.getElementById('other1-notes').value
                },
                otherMaterial2: {
                    name: document.getElementById('other2-name').value,
                    vendor: document.getElementById('other2-vendor').value,
                    stage: document.getElementById('other2-stage').value,
                    notes: document.getElementById('other2-notes').value
                }
            },
            
            // Initialize all development stages as "Not Started"
            patternTrial: 'Not Started',
            upperReady: 'Not Started',
            soleReady: 'Not Started',
            assembly: 'Not Started',
            qualityCheck: 'Not Started',
            readyToShip: false
        };
        
        samples.push(newSample);
        
        // Clear form and show success
        clearForm();
        updateClientFilters();
        
        showToast('Sample added successfully!');
        
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

// Export Functionality
function exportFilteredSamples(viewType) {
    const filteredSamples = getFilteredSamples(viewType);
    
    if (filteredSamples.length === 0) {
        showToast('No samples to export', 'error');
        return;
    }
    
    const headers = [
        'Sample ID', 'Sample Name', 'Client', 'Date Received', 'Current Stage', 'Status',
        'Pattern Trial', 'Upper Ready', 'Sole Ready', 'Assembly', 'Quality Check', 'Ready to Ship',
        'Upper Material Vendor', 'Upper Material Stage', 'Last Vendor', 'Last Stage',
        'Sole Vendor', 'Sole Stage', 'Other Material 1', 'Other Material 1 Vendor',
        'Other Material 2', 'Other Material 2 Vendor', 'Last Edited By', 'Last Edited Date', 'Notes'
    ];
    
    const csvContent = [
        headers.join(','),
        ...filteredSamples.map(sample => [
            sample.id,
            `"${sample.sampleName}"`,
            `"${sample.client}"`,
            sample.dateReceived,
            sample.currentStage,
            `"${getOverallStatus(sample)}"`,
            sample.patternTrial,
            sample.upperReady,
            sample.soleReady,
            sample.assembly,
            sample.qualityCheck,
            sample.readyToShip,
            `"${sample.materialDetails?.upperMaterial?.vendor || ''}"`,
            sample.materialDetails?.upperMaterial?.stage || '',
            `"${sample.materialDetails?.last?.vendor || ''}"`,
            sample.materialDetails?.last?.stage || '',
            `"${sample.materialDetails?.sole?.vendor || ''}"`,
            sample.materialDetails?.sole?.stage || '',
            `"${sample.materialDetails?.otherMaterial1?.name || ''}"`,
            `"${sample.materialDetails?.otherMaterial1?.vendor || ''}"`,
            `"${sample.materialDetails?.otherMaterial2?.name || ''}"`,
            `"${sample.materialDetails?.otherMaterial2?.vendor || ''}"`,
            `"${sample.lastEditedBy || ''}"`,
            sample.lastEditedDate || '',
            `"${sample.notes || ''}"`
        ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    const clientFilter = document.getElementById(`${viewType}-client-filter`);
    const clientSuffix = clientFilter && clientFilter.value ? `_${clientFilter.value.replace(/[^a-zA-Z0-9]/g, '_')}` : '';
    
    a.download = `samples_export${clientSuffix}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast(`Exported ${filteredSamples.length} samples`);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
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
    
    if (searchInput) searchInput.addEventListener('input', renderListView);
    if (filterStage) filterStage.addEventListener('change', renderListView);
    if (dashboardClientFilter) dashboardClientFilter.addEventListener('change', renderDashboard);
    if (listClientFilter) listClientFilter.addEventListener('change', renderListView);
    
    // Setup add sample form
    setupAddSampleForm();
    
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
