// Sample Tracker Application JavaScript

// Application State
let samples = [
    {
        id: "FS-001",
        sampleName: "Classic Oxford Brown",
        dateReceived: "2025-08-15",
        client: "Premium Footwear Co.",
        photos: ["sample1_1.jpg", "sample1_2.jpg"],
        materialIdentification: "Completed",
        materialProcurement: "Completed",
        patternTrial: "Completed",
        upperReady: "In Progress",
        soleReady: "Not Started",
        assembly: "Not Started",
        qualityCheck: "Not Started",
        readyToShip: false,
        notes: "High-quality leather sourced. Pattern approved on first trial.",
        currentStage: "Development",
        lastUpdated: "2025-08-17T14:30:00Z"
    },
    {
        id: "FS-002", 
        sampleName: "Casual Sneaker White",
        dateReceived: "2025-08-16",
        client: "SportStyle Brand",
        photos: ["sample2_1.jpg"],
        materialIdentification: "Completed",
        materialProcurement: "In Progress", 
        patternTrial: "Not Started",
        upperReady: "Not Started",
        soleReady: "Not Started",
        assembly: "Not Started",
        qualityCheck: "Not Started",
        readyToShip: false,
        notes: "Waiting for special fabric delivery from supplier.",
        currentStage: "Material",
        lastUpdated: "2025-08-16T09:15:00Z"
    },
    {
        id: "FS-003",
        sampleName: "Formal Derby Black", 
        dateReceived: "2025-08-12",
        client: "Executive Collection",
        photos: ["sample3_1.jpg", "sample3_2.jpg", "sample3_3.jpg"],
        materialIdentification: "Completed",
        materialProcurement: "Completed",
        patternTrial: "Completed",
        upperReady: "Completed",
        soleReady: "Completed", 
        assembly: "Completed",
        qualityCheck: "Completed",
        readyToShip: true,
        notes: "Excellent quality achieved. Client very satisfied with finish.",
        currentStage: "Ready to Ship",
        lastUpdated: "2025-08-17T16:45:00Z"
    },
    {
        id: "FS-004",
        sampleName: "Summer Sandal Tan",
        dateReceived: "2025-08-14", 
        client: "Beach Comfort Ltd.",
        photos: ["sample4_1.jpg"],
        materialIdentification: "Completed",
        materialProcurement: "Completed",
        patternTrial: "Failed",
        upperReady: "Not Started",
        soleReady: "In Progress",
        assembly: "Not Started", 
        qualityCheck: "Not Started",
        readyToShip: false,
        notes: "Pattern trial failed - strap width needs adjustment. Redesigning now.",
        currentStage: "Development",
        lastUpdated: "2025-08-16T11:20:00Z"
    },
    {
        id: "FS-005",
        sampleName: "Athletic Runner Blue",
        dateReceived: "2025-08-17",
        client: "Marathon Sports",
        photos: ["sample5_1.jpg", "sample5_2.jpg"],
        materialIdentification: "In Progress",
        materialProcurement: "Not Started", 
        patternTrial: "Not Started",
        upperReady: "Not Started",
        soleReady: "Not Started",
        assembly: "Not Started",
        qualityCheck: "Not Started", 
        readyToShip: false,
        notes: "Special breathable mesh material being evaluated.",
        currentStage: "Material",
        lastUpdated: "2025-08-17T10:00:00Z"
    },
    {
        id: "FS-006",
        sampleName: "Winter Boot Brown",
        dateReceived: "2025-08-13",
        client: "Cold Weather Gear",
        photos: ["sample6_1.jpg"],
        materialIdentification: "Completed", 
        materialProcurement: "Completed",
        patternTrial: "Completed",
        upperReady: "Completed", 
        soleReady: "In Progress",
        assembly: "Not Started",
        qualityCheck: "Not Started",
        readyToShip: false,
        notes: "Waterproof lining installed. Working on slip-resistant sole.",
        currentStage: "Development", 
        lastUpdated: "2025-08-17T13:15:00Z"
    }
];

let nextSampleNumber = 7;
let currentSampleId = null;

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
    const allCompleted = sample.materialIdentification === 'Completed' &&
                        sample.materialProcurement === 'Completed' &&
                        sample.patternTrial === 'Completed' &&
                        sample.upperReady === 'Completed' &&
                        sample.soleReady === 'Completed' &&
                        sample.assembly === 'Completed' &&
                        sample.qualityCheck === 'Completed';
    
    if (allCompleted) {
        return 'Completed';
    }
    
    // Check if any stage is in progress
    const anyInProgress = Object.values(sample).some(value => value === 'In Progress');
    if (anyInProgress) {
        return 'In Progress';
    }
    
    return 'Not Started';
}

// View Management
function showView(viewName) {
    console.log('Switching to view:', viewName);
    
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
    updateStats();
    renderStageGroups();
}

function updateStats() {
    const totalSamples = samples.length;
    const readySamples = samples.filter(s => s.readyToShip).length;
    const inProgressSamples = samples.filter(s => getOverallStatus(s) === 'In Progress').length;
    
    document.getElementById('total-samples').textContent = totalSamples;
    document.getElementById('ready-samples').textContent = readySamples;
    document.getElementById('in-progress-samples').textContent = inProgressSamples;
}

function renderStageGroups() {
    const materialStage = document.getElementById('material-stage-samples');
    const developmentStage = document.getElementById('development-stage-samples');
    const finalStage = document.getElementById('final-stage-samples');
    const readyStage = document.getElementById('ready-stage-samples');
    
    // Clear existing content
    [materialStage, developmentStage, finalStage, readyStage].forEach(container => {
        if (container) container.innerHTML = '';
    });
    
    samples.forEach(sample => {
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
    `;
    
    return card;
}

// List View Rendering
function renderListView() {
    const tableBody = document.getElementById('samples-table-body');
    const searchInput = document.getElementById('search-input');
    const filterStage = document.getElementById('filter-stage');
    
    if (!tableBody) return;
    
    let filteredSamples = samples;
    
    // Apply search filter
    if (searchInput) {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filteredSamples = filteredSamples.filter(sample => 
                sample.sampleName.toLowerCase().includes(searchTerm) ||
                sample.id.toLowerCase().includes(searchTerm) ||
                sample.client.toLowerCase().includes(searchTerm)
            );
        }
    }
    
    // Apply stage filter
    if (filterStage) {
        const stageFilter = filterStage.value;
        if (stageFilter) {
            filteredSamples = filteredSamples.filter(sample => sample.currentStage === stageFilter);
        }
    }
    
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
            <td>
                <div class="table-actions">
                    <button class="btn btn--outline btn-sm" onclick="openSampleModal('${sample.id}')">View</button>
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
    card.onclick = () => openSampleModal(sample.id);
    
    const status = getOverallStatus(sample);
    const statusClass = getStatusBadgeClass(status);
    
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
    `;
    
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

// Sample Modal Management
function openSampleModal(sampleId) {
    console.log('Opening sample modal for:', sampleId);
    currentSampleId = sampleId;
    const sample = samples.find(s => s.id === sampleId);
    
    if (!sample) return;
    
    // Populate modal with sample data
    document.getElementById('modal-sample-title').textContent = `${sample.sampleName} (${sample.id})`;
    document.getElementById('detail-sample-name').textContent = sample.sampleName;
    document.getElementById('detail-sample-id').textContent = sample.id;
    document.getElementById('detail-client').textContent = sample.client;
    document.getElementById('detail-date').textContent = formatDate(sample.dateReceived);
    document.getElementById('detail-last-updated').textContent = formatDateTime(sample.lastUpdated);
    
    // Populate stage selects
    document.getElementById('detail-material-id').value = sample.materialIdentification;
    document.getElementById('detail-material-proc').value = sample.materialProcurement;
    document.getElementById('detail-pattern').value = sample.patternTrial;
    document.getElementById('detail-upper').value = sample.upperReady;
    document.getElementById('detail-sole').value = sample.soleReady;
    document.getElementById('detail-assembly').value = sample.assembly;
    document.getElementById('detail-quality').value = sample.qualityCheck;
    document.getElementById('detail-ready-ship').value = sample.readyToShip.toString();
    document.getElementById('detail-notes').value = sample.notes;
    
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
    
    // Show modal
    const modal = document.getElementById('sample-detail-modal');
    modal.classList.remove('hidden');
}

function closeSampleModal() {
    console.log('Closing sample modal');
    const modal = document.getElementById('sample-detail-modal');
    modal.classList.add('hidden');
    currentSampleId = null;
}

function saveSampleChanges() {
    console.log('Saving sample changes');
    if (!currentSampleId) return;
    
    const sample = samples.find(s => s.id === currentSampleId);
    if (!sample) return;
    
    // Update sample with form values
    sample.materialIdentification = document.getElementById('detail-material-id').value;
    sample.materialProcurement = document.getElementById('detail-material-proc').value;
    sample.patternTrial = document.getElementById('detail-pattern').value;
    sample.upperReady = document.getElementById('detail-upper').value;
    sample.soleReady = document.getElementById('detail-sole').value;
    sample.assembly = document.getElementById('detail-assembly').value;
    sample.qualityCheck = document.getElementById('detail-quality').value;
    sample.readyToShip = document.getElementById('detail-ready-ship').value === 'true';
    sample.notes = document.getElementById('detail-notes').value;
    sample.lastUpdated = new Date().toISOString();
    
    // Update current stage based on progress
    sample.currentStage = determineCurrentStage(sample);
    
    closeSampleModal();
    
    // Refresh current view
    const currentView = document.querySelector('.nav-btn.active').dataset.view;
    showView(currentView);
    
    alert('Sample updated successfully!');
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
            
            // Initialize all stages as "Not Started"
            materialIdentification: 'Not Started',
            materialProcurement: 'Not Started',
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
        
        alert('Sample added successfully!');
        
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
function exportSamples() {
    const headers = ['Sample ID', 'Sample Name', 'Client', 'Date Received', 'Current Stage', 'Material ID', 'Material Proc', 'Pattern Trial', 'Upper Ready', 'Sole Ready', 'Assembly', 'Quality Check', 'Ready to Ship', 'Notes', 'Last Updated'];
    
    const csvContent = [
        headers.join(','),
        ...samples.map(sample => [
            sample.id,
            `"${sample.sampleName}"`,
            `"${sample.client}"`,
            sample.dateReceived,
            sample.currentStage,
            sample.materialIdentification,
            sample.materialProcurement,
            sample.patternTrial,
            sample.upperReady,
            sample.soleReady,
            sample.assembly,
            sample.qualityCheck,
            sample.readyToShip,
            `"${sample.notes}"`,
            sample.lastUpdated
        ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `samples_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    // Navigation event listeners
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Navigation button clicked:', btn.dataset.view);
            showView(btn.dataset.view);
        });
    });
    
    // Search and filter event listeners
    const searchInput = document.getElementById('search-input');
    const filterStage = document.getElementById('filter-stage');
    
    if (searchInput) {
        searchInput.addEventListener('input', renderListView);
    }
    if (filterStage) {
        filterStage.addEventListener('change', renderListView);
    }
    
    // Setup add sample form
    setupAddSampleForm();
    
    // Initialize with dashboard view
    showView('dashboard');
    
    // Modal close on backdrop click
    const modal = document.getElementById('sample-detail-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'sample-detail-modal') {
                closeSampleModal();
            }
        });
    }
});

// Make functions globally available
window.showView = showView;
window.openSampleModal = openSampleModal;
window.closeSampleModal = closeSampleModal;
window.saveSampleChanges = saveSampleChanges;
window.clearForm = clearForm;
window.exportSamples = exportSamples;