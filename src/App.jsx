import { useMemo, useRef, useState } from 'react'
import './ComplianceApp.css'

const initialVendors = [
  {
    id: 'copperline',
    name: 'Copperline Electric',
    initials: 'CE',
    trade: 'Electrical · Milwaukee, WI',
    contact: 'Morgan Lee',
    email: 'morgan@copperline.example',
    projects: 2,
    documents: [
      { id: 'coi', name: 'Certificate of insurance', file: 'copperline_coi_2027.pdf', expires: 'Aug 12, 2027', status: 'verified' },
      { id: 'w9', name: 'W-9 tax form', file: 'copperline_w9.pdf', expires: 'No expiration', status: 'verified' },
      { id: 'license', name: 'Electrical contractor license', file: 'License expired Sep 28, 2026', expires: 'Sep 28, 2026', status: 'expired' },
      { id: 'safety', name: 'Safety certification', file: 'Document not received', expires: '—', status: 'missing' },
    ],
  },
  {
    id: 'northline',
    name: 'Northline Concrete',
    initials: 'NC',
    trade: 'Concrete · Waukesha, WI',
    contact: 'Avery Brooks',
    email: 'avery@northline.example',
    projects: 3,
    documents: [
      { id: 'coi', name: 'Certificate of insurance', file: 'northline_coi_2027.pdf', expires: 'Feb 04, 2027', status: 'verified' },
      { id: 'w9', name: 'W-9 tax form', file: 'northline_w9.pdf', expires: 'No expiration', status: 'verified' },
      { id: 'license', name: 'Trade license', file: 'northline_license.pdf', expires: 'Jan 19, 2027', status: 'verified' },
      { id: 'safety', name: 'Safety certification', file: 'northline_safety.pdf', expires: 'Nov 02, 2026', status: 'expiring' },
    ],
  },
  {
    id: 'atlas',
    name: 'Atlas Siteworks',
    initials: 'AS',
    trade: 'Earthworks · Madison, WI',
    contact: 'Riley Chen',
    email: 'riley@atlassite.example',
    projects: 1,
    documents: [
      { id: 'coi', name: 'Certificate of insurance', file: 'atlas_coi_2027.pdf', expires: 'Oct 29, 2026', status: 'expiring' },
      { id: 'w9', name: 'W-9 tax form', file: 'atlas_w9.pdf', expires: 'No expiration', status: 'verified' },
      { id: 'license', name: 'Trade license', file: 'atlas_license.pdf', expires: 'Jun 30, 2027', status: 'verified' },
      { id: 'safety', name: 'Safety certification', file: 'atlas_safety.pdf', expires: 'Dec 16, 2026', status: 'verified' },
    ],
  },
  {
    id: 'summit',
    name: 'Summit Mechanical',
    initials: 'SM',
    trade: 'HVAC · Brookfield, WI',
    contact: 'Jamie Patel',
    email: 'jamie@summitmech.example',
    projects: 2,
    documents: [
      { id: 'coi', name: 'Certificate of insurance', file: 'summit_coi_2027.pdf', expires: 'Mar 11, 2027', status: 'verified' },
      { id: 'w9', name: 'W-9 tax form', file: 'Document not received', expires: '—', status: 'missing' },
      { id: 'license', name: 'Trade license', file: 'summit_license.pdf', expires: 'Dec 08, 2026', status: 'verified' },
      { id: 'safety', name: 'Safety certification', file: 'summit_safety.pdf', expires: 'May 22, 2027', status: 'verified' },
    ],
  },
  {
    id: 'evergreen',
    name: 'Evergreen Interiors',
    initials: 'EI',
    trade: 'Finish carpentry · Kenosha, WI',
    contact: 'Taylor Nguyen',
    email: 'taylor@evergreen.example',
    projects: 1,
    documents: [
      { id: 'coi', name: 'Certificate of insurance', file: 'evergreen_coi_2027.pdf', expires: 'Apr 03, 2027', status: 'verified' },
      { id: 'w9', name: 'W-9 tax form', file: 'evergreen_w9.pdf', expires: 'No expiration', status: 'verified' },
      { id: 'license', name: 'Trade license', file: 'evergreen_license.pdf', expires: 'Feb 14, 2027', status: 'verified' },
      { id: 'safety', name: 'Safety certification', file: 'evergreen_safety.pdf', expires: 'Jan 28, 2027', status: 'verified' },
    ],
  },
]

const statusLabels = {
  verified: 'Verified',
  expiring: 'Expiring soon',
  expired: 'Expired',
  missing: 'Missing',
  submitted: 'In review',
}

function Icon({ name, size = 18 }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    files: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h8" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.6.9l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.6-.9l-1.7.6-1.4-2.4L7.5 15a8 8 0 0 1 0-1.9l-1.4-1.2 1.4-2.4 1.7.6a8 8 0 0 1 1.6-.9l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.6.9l1.7-.6 1.4 2.4-1.4 1.2a8 8 0 0 1-.1 1.9Z" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5M12 15V3" /></>,
    upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m17 8-5-5-5 5M12 3v12" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
    alert: <><path d="m10.3 3.9-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3.1l-8-14a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4m0 4h.01" /></>,
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
  }

  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

function getVendorStatus(vendor) {
  if (vendor.documents.some((document) => ['missing', 'expired'].includes(document.status))) return 'action'
  if (vendor.documents.some((document) => document.status === 'expiring')) return 'expiring'
  if (vendor.documents.some((document) => document.status === 'submitted')) return 'review'
  return 'ready'
}

function App() {
  const [vendors, setVendors] = useState(initialVendors)
  const [selectedId, setSelectedId] = useState('copperline')
  const [filter, setFilter] = useState('All vendors')
  const [search, setSearch] = useState('')
  const [notice, setNotice] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newVendorName, setNewVendorName] = useState('')
  const fileInput = useRef(null)

  const visibleVendors = useMemo(() => vendors.filter((vendor) => {
    const matchesSearch = `${vendor.name} ${vendor.trade}`.toLowerCase().includes(search.toLowerCase())
    const status = getVendorStatus(vendor)
    const matchesFilter = filter === 'All vendors'
      || (filter === 'Needs attention' && ['action', 'expiring', 'review'].includes(status))
      || (filter === 'Ready' && status === 'ready')
    return matchesSearch && matchesFilter
  }), [vendors, filter, search])

  const selectedVendor = vendors.find((vendor) => vendor.id === selectedId) ?? visibleVendors[0]
  const readyCount = vendors.filter((vendor) => getVendorStatus(vendor) === 'ready').length
  const attentionCount = vendors.filter((vendor) => ['action', 'expiring', 'review'].includes(getVendorStatus(vendor))).length
  const missingCount = vendors.reduce((count, vendor) => count + vendor.documents.filter((document) => ['missing', 'expired'].includes(document.status)).length, 0)
  const expiringCount = vendors.reduce((count, vendor) => count + vendor.documents.filter((document) => document.status === 'expiring').length, 0)

  function updateDocument(vendorId, documentId, updates) {
    setVendors((current) => current.map((vendor) => vendor.id !== vendorId ? vendor : {
      ...vendor,
      documents: vendor.documents.map((document) => document.id === documentId ? { ...document, ...updates } : document),
    }))
  }

  function handleUpload(event) {
    const file = event.target.files?.[0]
    const pendingDocument = selectedVendor?.documents.find((document) => ['missing', 'expired'].includes(document.status))
    if (!file || !selectedVendor || !pendingDocument) return
    updateDocument(selectedVendor.id, pendingDocument.id, { file: file.name, status: 'submitted' })
    setNotice(`${file.name} added to ${selectedVendor.name}'s packet.`)
    event.target.value = ''
  }

  function addVendor(event) {
    event.preventDefault()
    const name = newVendorName.trim()
    if (!name) return
    const id = `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`
    const vendor = {
      id,
      name,
      initials: name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase(),
      trade: 'New vendor · Add trade and location',
      contact: 'Vendor contact',
      email: 'Add contact email',
      projects: 0,
      documents: [
        { id: 'coi', name: 'Certificate of insurance', file: 'Document not received', expires: '—', status: 'missing' },
        { id: 'w9', name: 'W-9 tax form', file: 'Document not received', expires: '—', status: 'missing' },
        { id: 'license', name: 'Trade license', file: 'Document not received', expires: '—', status: 'missing' },
        { id: 'safety', name: 'Safety certification', file: 'Document not received', expires: '—', status: 'missing' },
      ],
    }
    setVendors((current) => [vendor, ...current])
    setSelectedId(id)
    setFilter('All vendors')
    setSearch('')
    setNewVendorName('')
    setIsModalOpen(false)
    setNotice(`${name} added. Their compliance checklist is ready.`)
  }

  function exportCsv() {
    const rows = [['Vendor', 'Trade / location', 'Status', 'Verified documents', 'Total documents'], ...vendors.map((vendor) => [
      vendor.name,
      vendor.trade,
      getVendorStatus(vendor),
      vendor.documents.filter((document) => document.status === 'verified').length,
      vendor.documents.length,
    ])]
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'site-ready-vendor-compliance.csv'
    link.click()
    URL.revokeObjectURL(url)
    setNotice('Vendor compliance report exported.')
  }

  function requestDocuments() {
    if (!selectedVendor) return
    setNotice(`Update request prepared for ${selectedVendor.contact} at ${selectedVendor.email}.`)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#overview" aria-label="Groundwork home">
          <span className="brand-mark"><span /></span>
          <span>groundwork<small>CONTRACTOR OPS</small></span>
        </a>
        <div className="workspace-switcher"><span className="workspace-avatar">B</span><span><strong>Brightbuild Co.</strong><small>General contractor</small></span><span className="switcher-caret">⌄</span></div>
        <p className="nav-caption">WORKSPACE</p>
        <nav className="side-nav" aria-label="Main navigation">
          <a className="nav-item" href="#overview"><Icon name="grid" /> Overview</a>
          <a className="nav-item active" href="#vendors"><Icon name="users" /> Vendors <span className="nav-count">{vendors.length}</span></a>
          <a className="nav-item" href="#documents"><Icon name="files" /> Documents</a>
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card"><span className="help-icon">?</span><strong>Need a hand?</strong><p>See how vendor compliance works.</p><button type="button" onClick={() => setNotice('Help center is coming soon in this demo.')}>Visit help center <Icon name="arrow" size={14} /></button></div>
          <a className="nav-item" href="#settings"><Icon name="settings" /> Settings</a>
          <div className="profile"><span className="profile-avatar">JL</span><span><strong>Jordan Lee</strong><small>Operations manager</small></span><span className="more-dots">···</span></div>
        </div>
      </aside>

      <main className="main-area" id="overview">
        <header className="topbar">
          <div className="breadcrumbs"><span>Workspace</span><b>/</b><strong>Vendors</strong></div>
          <div className="topbar-actions">
            <label className="global-search"><Icon name="search" size={17} /><input aria-label="Search vendors" placeholder="Search vendors..." value={search} onChange={(event) => setSearch(event.target.value)} /><kbd>⌘ K</kbd></label>
            <button type="button" className="avatar-button" aria-label="Jordan Lee account">JL</button>
          </div>
        </header>

        <div className="page-content">
          <section className="page-intro">
            <div><div className="breadcrumb-kicker">OPERATIONS <span>/</span> COMPLIANCE</div><h1>Vendor compliance</h1><p>Keep every crew cleared, compliant, and ready to work.</p></div>
            <div className="intro-actions"><button className="button button-quiet" type="button" onClick={exportCsv}><Icon name="download" size={16} /> Export report</button><button className="button button-primary" type="button" onClick={() => setIsModalOpen(true)}><Icon name="plus" size={17} /> Add vendor</button></div>
          </section>

          <section className="metrics-grid" aria-label="Compliance summary">
            <article className="metric-card"><div className="metric-top"><span>Active vendors</span><span className="metric-icon green"><Icon name="users" size={17} /></span></div><strong>{vendors.length}</strong><small><span className="trend-positive">↑ 2</span> added this month</small></article>
            <article className="metric-card"><div className="metric-top"><span>Ready to mobilize</span><span className="metric-icon mint"><Icon name="check" size={17} /></span></div><strong>{readyCount}<small className="metric-total"> / {vendors.length}</small></strong><small>{vendors.length ? Math.round((readyCount / vendors.length) * 100) : 0}% of your vendor roster</small></article>
            <article className="metric-card"><div className="metric-top"><span>Expiring in 30 days</span><span className="metric-icon amber"><Icon name="clock" size={17} /></span></div><strong>{expiringCount}</strong><small>Documents need renewal</small></article>
            <article className="metric-card"><div className="metric-top"><span>Needs attention</span><span className="metric-icon rose"><Icon name="alert" size={17} /></span></div><strong>{attentionCount}</strong><small>{missingCount} missing or expired items</small></article>
          </section>

          <section className="notice-banner"><span className="notice-symbol"><Icon name="alert" size={18} /></span><div><strong>{attentionCount} vendors need a follow-up</strong><p>Resolve outstanding documents before crews arrive on site.</p></div><button type="button" onClick={() => setFilter('Needs attention')}>Review action items <Icon name="arrow" size={15} /></button></section>

          <section className="workspace-grid" id="vendors">
            <div className="vendor-card">
              <div className="card-heading"><div><h2>Vendor roster</h2><p>Compliance status across active projects</p></div><button type="button" className="icon-button" aria-label="Export vendor list" onClick={exportCsv}><Icon name="download" size={17} /></button></div>
              <div className="roster-toolbar"><div className="filter-tabs" role="tablist" aria-label="Filter vendor list">{['All vendors', 'Needs attention', 'Ready'].map((item) => <button type="button" role="tab" aria-selected={filter === item} className={filter === item ? 'selected' : ''} key={item} onClick={() => setFilter(item)}>{item}{item === 'Needs attention' && <span>{attentionCount}</span>}</button>)}</div><span className="vendor-total">{visibleVendors.length} vendors</span></div>
              <div className="vendor-table-wrap"><table className="vendor-table"><thead><tr><th>VENDOR</th><th>PROJECTS</th><th>DOCUMENTS</th><th>STATUS</th><th aria-label="Select vendor" /></tr></thead><tbody>
                {visibleVendors.map((vendor) => {
                  const status = getVendorStatus(vendor)
                  const verified = vendor.documents.filter((document) => document.status === 'verified').length
                  const progress = Math.round((verified / vendor.documents.length) * 100)
                  return <tr key={vendor.id} className={selectedVendor?.id === vendor.id ? 'active-row' : ''} onClick={() => setSelectedId(vendor.id)}>
                    <td><button type="button" className="vendor-identity" onClick={() => setSelectedId(vendor.id)}><span className={`vendor-avatar avatar-${vendor.id.slice(0, 1)}`}>{vendor.initials}</span><span><strong>{vendor.name}</strong><small>{vendor.trade}</small></span></button></td>
                    <td><span className="project-count">{vendor.projects} {vendor.projects === 1 ? 'project' : 'projects'}</span></td>
                    <td><div className="document-progress"><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><small>{verified}/{vendor.documents.length} verified</small></div></td>
                    <td><span className={`status-pill ${status}`}>{status === 'action' && <i />}{status === 'ready' && <i />}{status === 'expiring' && <i />}{status === 'review' && <i />}{status === 'action' ? 'Action needed' : status === 'ready' ? 'Ready' : status === 'review' ? 'In review' : 'Expiring'}</span></td>
                    <td><button type="button" className="row-arrow" aria-label={`View ${vendor.name}`} onClick={() => setSelectedId(vendor.id)}><span>›</span></button></td>
                  </tr>
                })}
                {visibleVendors.length === 0 && <tr><td colSpan="5" className="no-results">No vendors match. Try another search or filter.</td></tr>}
              </tbody></table></div>
              <div className="table-footer"><span>Showing <strong>{visibleVendors.length}</strong> of <strong>{vendors.length}</strong> vendors</span><button type="button" onClick={() => setIsModalOpen(true)}>+ Add another vendor</button></div>
            </div>

            {selectedVendor && <aside className="detail-card" aria-live="polite">
              <div className="detail-topline"><span className="detail-label">VENDOR PROFILE</span><button type="button" className="icon-button" aria-label="More vendor actions" onClick={() => setNotice(`More actions for ${selectedVendor.name} are coming soon.`)}>···</button></div>
              <div className="vendor-profile"><span className={`vendor-avatar large avatar-${selectedVendor.id.slice(0, 1)}`}>{selectedVendor.initials}</span><div><h2>{selectedVendor.name}</h2><p>{selectedVendor.trade}</p></div></div>
              <div className="detail-status-row"><span className={`status-pill ${getVendorStatus(selectedVendor)}`}>{getVendorStatus(selectedVendor) === 'action' ? 'Action needed' : getVendorStatus(selectedVendor) === 'ready' ? 'Ready to mobilize' : getVendorStatus(selectedVendor) === 'review' ? 'In review' : 'Expiring soon'}</span><span className="assigned-projects">{selectedVendor.projects} active {selectedVendor.projects === 1 ? 'project' : 'projects'}</span></div>
              <div className="detail-divider" />
              <div className="docs-heading"><div><h3>Required documents</h3><p>Checklist for this vendor</p></div><span>{selectedVendor.documents.filter((document) => document.status === 'verified').length}/{selectedVendor.documents.length}</span></div>
              <div className="document-list">{selectedVendor.documents.map((document) => <div className="document-row" key={document.id}><span className={`doc-status ${document.status}`}><Icon name={document.status === 'verified' ? 'check' : document.status === 'expiring' ? 'clock' : document.status === 'submitted' ? 'clock' : 'alert'} size={15} /></span><div className="document-info"><strong>{document.name}</strong><small>{document.file}</small></div><span className={`doc-tag ${document.status}`}>{statusLabels[document.status]}</span></div>)}</div>
              <div className="expiration-note"><span className="expiration-dot" /><span><strong>Next expiration</strong><small>{selectedVendor.documents.find((document) => ['expiring', 'expired'].includes(document.status))?.expires ?? 'No upcoming expirations'}</small></span></div>
              <div className="detail-actions"><button type="button" className="button button-outline" onClick={requestDocuments}><Icon name="mail" size={16} /> Request documents</button><button type="button" className="button button-primary" onClick={() => fileInput.current?.click()}><Icon name="upload" size={16} /> Upload file</button><input ref={fileInput} className="visually-hidden" type="file" accept=".pdf,.png,.jpg,.jpeg,.doc,.docx" onChange={handleUpload} /></div>
              <p className="detail-footnote">Contact <strong>{selectedVendor.contact}</strong> · {selectedVendor.email}</p>
            </aside>}
          </section>
          <footer className="page-footnote"><span>Last synced just now</span><span>Demo workspace · Sample vendor data</span></footer>
        </div>
      </main>

      {notice && <div className="toast" role="status"><span><Icon name="check" size={17} /></span>{notice}<button type="button" aria-label="Dismiss notification" onClick={() => setNotice('')}><Icon name="close" size={16} /></button></div>}
      {isModalOpen && <div className="modal-backdrop" onClick={(event) => { if (event.target === event.currentTarget) setIsModalOpen(false) }}><section className="add-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close icon-button" type="button" aria-label="Close" onClick={() => setIsModalOpen(false)}><Icon name="close" size={18} /></button><span className="modal-icon"><Icon name="users" size={20} /></span><h2 id="modal-title">Add a vendor</h2><p>Start a compliance checklist for a new subcontractor.</p><form onSubmit={addVendor}><label htmlFor="vendor-name">Company name</label><input id="vendor-name" autoFocus required placeholder="e.g. Lakeside Plumbing" value={newVendorName} onChange={(event) => setNewVendorName(event.target.value)} /><div className="modal-note"><Icon name="files" size={17} /><span>We’ll create a checklist with insurance, tax, license, and safety documents.</span></div><div className="modal-actions"><button type="button" className="button button-quiet" onClick={() => setIsModalOpen(false)}>Cancel</button><button type="submit" className="button button-primary"><Icon name="plus" size={16} /> Create vendor</button></div></form></section></div>}
    </div>
  )
}

export default App
