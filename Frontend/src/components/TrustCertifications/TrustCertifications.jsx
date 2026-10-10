import React, { useState, useEffect } from "react";
import "./TrustCertifications.css";

const certificateData = {
  gst: {
    id: "gst",
    title: "GST Registration Certificate",
    subtitle: "Government of India • Form GST REG-06",
    codeLabel: "GSTIN",
    codeValue: "09BQUPY9133K1ZM",
    tradeName: "AAYUSHI EXPORTS",
    legalName: "Priyanka Yadav",
    nature: "Proprietorship",
    jurisdiction: "Chandausi Sector-1, Sambhal, UP (244412)",
    registrationDate: "19/11/2025",
    pdfUrl: "/assets/certificates/gst-certificate.pdf",
    verifyUrl: "https://services.gst.gov.in/services/searchtp",
    pages: [
      { page: 1, label: "Page 1 - Certificate", img: "/assets/certificates/gst-certificate-page-1.png" },
      { page: 2, label: "Page 2 - Annexure A", img: "/assets/certificates/gst-certificate-page-2.png" },
      { page: 3, label: "Page 3 - Annexure B", img: "/assets/certificates/gst-certificate-page-3.png" },
    ],
  },
  iec: {
    id: "iec",
    title: "Importer-Exporter Code (IEC)",
    subtitle: "Ministry of Commerce & Industry • DGFT Govt of India",
    codeLabel: "IEC Code",
    codeValue: "BQUPY9133K",
    tradeName: "AAYUSHI EXPORTS",
    legalName: "Priyanka Yadav",
    nature: "Proprietorship (Export Entity)",
    jurisdiction: "CLA Delhi, DGFT Central Licensing Area",
    registrationDate: "16/01/2026",
    pdfUrl: "/assets/certificates/iec-certificate.pdf",
    verifyUrl: "https://dgft.gov.in",
    pages: [
      { page: 1, label: "Official IEC Certificate", img: "/assets/certificates/iec-certificate-page-1.png" },
    ],
  },
};

export default function TrustCertifications() {
  const [activeModalCert, setActiveModalCert] = useState(null); // 'gst' | 'iec' | null
  const [activePageIdx, setActivePageIdx] = useState(0);
  const [copiedCode, setCopiedCode] = useState(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveModalCert(null);
      }
    };
    if (activeModalCert) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeModalCert]);

  const handleOpenModal = (certKey, pageIdx = 0) => {
    setActiveModalCert(certKey);
    setActivePageIdx(pageIdx);
  };

  const handleCopyCode = (code, e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2200);
  };

  const modalCert = activeModalCert ? certificateData[activeModalCert] : null;

  return (
    <section className="trust-cert-section">
      <div className="container">
        {/* Section Heading */}
        <div className="text-center trust-header">
          <div className="trust-badge-pill">
            <i className="fas fa-shield-alt"></i> 100% Verified &amp; Government Recognized
          </div>
          <h2>
            Trust, Compliance &amp; <span>Legal Certifications</span>
          </h2>
          <p>
            <strong>AAYUSHI EXPORTS</strong> is an officially registered and government-accredited
            export house recognized by the Directorate General of Foreign Trade (DGFT) and the
            Goods &amp; Services Tax Council of India.
          </p>
        </div>

        {/* 2 Main Certification Cards */}
        <div className="row trust-cards-grid">
          {/* Card 1: GST Registration */}
          <div className="col-lg-6 mb-30">
            <div className="cert-card">
              <div className="cert-card-header">
                <div className="cert-authority-info">
                  <div className="cert-icon-box gst-theme">
                    <i className="fas fa-landmark"></i>
                  </div>
                  <div className="cert-titles">
                    <h4>GST Registration Certificate</h4>
                    <span className="cert-subtitle">Government of India • Form GST REG-06</span>
                  </div>
                </div>
                <span className="verified-stamp">
                  <i className="fas fa-check-circle"></i> Active &amp; Valid
                </span>
              </div>

              <div className="cert-card-body">
                {/* Thumbnail Preview */}
                <div
                  className="cert-preview-thumbnail-wrap"
                  onClick={() => handleOpenModal("gst", 0)}
                  title="Click to view full certificate"
                >
                  <img
                    src="/assets/certificates/gst-certificate-page-1.png"
                    alt="GST Registration Certificate - Aayushi Exports"
                    className="cert-preview-img"
                    loading="lazy"
                  />
                  <div className="cert-preview-overlay">
                    <i className="fas fa-search-plus"></i>
                    <span>Click to View Full Certificate (3 Pages)</span>
                  </div>
                </div>

                {/* Key Details Table */}
                <div className="cert-details-table">
                  <div className="cert-row">
                    <span className="cert-label">GSTIN / Tax ID:</span>
                    <div className="cert-code-chip">
                      <span>09BQUPY9133K1ZM</span>
                      <button
                        type="button"
                        className="copy-btn-mini"
                        onClick={(e) => handleCopyCode("09BQUPY9133K1ZM", e)}
                        title="Copy GSTIN"
                      >
                        <i className={copiedCode === "09BQUPY9133K1ZM" ? "fas fa-check text-success" : "far fa-copy"}></i>
                      </button>
                    </div>
                  </div>
                  <div className="cert-row">
                    <span className="cert-label">Trade Name:</span>
                    <span className="cert-value">AAYUSHI EXPORTS</span>
                  </div>
                  <div className="cert-row">
                    <span className="cert-label">Legal Name:</span>
                    <span className="cert-value">Priyanka Yadav (Proprietor)</span>
                  </div>
                  <div className="cert-row">
                    <span className="cert-label">Principal Place:</span>
                    <span className="cert-value">Ghata No 602, Chandausi, Sambhal, UP</span>
                  </div>
                  <div className="cert-row">
                    <span className="cert-label">Tax Type:</span>
                    <span className="cert-value text-success">Regular Taxpayer • Active</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="cert-card-footer">
                <button
                  type="button"
                  className="cert-btn-primary"
                  onClick={() => handleOpenModal("gst", 0)}
                >
                  <i className="fas fa-expand-arrows-alt"></i> View Full Certificate
                </button>
                <a
                  href="/assets/certificates/gst-certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-btn-secondary"
                  title="Download Official PDF"
                >
                  <i className="fas fa-file-pdf text-danger"></i> Download PDF
                </a>
                <a
                  href="https://services.gst.gov.in/services/searchtp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-btn-secondary"
                  title="Verify on official GST portal"
                >
                  <i className="fas fa-external-link-alt"></i> Verify Online
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: IEC Export License */}
          <div className="col-lg-6 mb-30">
            <div className="cert-card">
              <div className="cert-card-header">
                <div className="cert-authority-info">
                  <div className="cert-icon-box iec-theme">
                    <i className="fas fa-globe-americas"></i>
                  </div>
                  <div className="cert-titles">
                    <h4>Importer-Exporter Code (IEC)</h4>
                    <span className="cert-subtitle">Ministry of Commerce &amp; Industry • DGFT</span>
                  </div>
                </div>
                <span className="verified-stamp">
                  <i className="fas fa-check-circle"></i> DGFT Certified
                </span>
              </div>

              <div className="cert-card-body">
                {/* Thumbnail Preview */}
                <div
                  className="cert-preview-thumbnail-wrap"
                  onClick={() => handleOpenModal("iec", 0)}
                  title="Click to view full certificate"
                >
                  <img
                    src="/assets/certificates/iec-certificate-page-1.png"
                    alt="IEC Certificate - Aayushi Exports"
                    className="cert-preview-img"
                    loading="lazy"
                  />
                  <div className="cert-preview-overlay">
                    <i className="fas fa-search-plus"></i>
                    <span>Click to View Full Certificate</span>
                  </div>
                </div>

                {/* Key Details Table */}
                <div className="cert-details-table">
                  <div className="cert-row">
                    <span className="cert-label">IEC Code:</span>
                    <div className="cert-code-chip">
                      <span>BQUPY9133K</span>
                      <button
                        type="button"
                        className="copy-btn-mini"
                        onClick={(e) => handleCopyCode("BQUPY9133K", e)}
                        title="Copy IEC Code"
                      >
                        <i className={copiedCode === "BQUPY9133K" ? "fas fa-check text-success" : "far fa-copy"}></i>
                      </button>
                    </div>
                  </div>
                  <div className="cert-row">
                    <span className="cert-label">Firm Name:</span>
                    <span className="cert-value">AAYUSHI EXPORTS</span>
                  </div>
                  <div className="cert-row">
                    <span className="cert-label">PAN Number:</span>
                    <div className="cert-code-chip">
                      <span>BQUPY9133K</span>
                      <button
                        type="button"
                        className="copy-btn-mini"
                        onClick={(e) => handleCopyCode("BQUPY9133K", e)}
                        title="Copy PAN"
                      >
                        <i className={copiedCode === "BQUPY9133K" ? "fas fa-check text-success" : "far fa-copy"}></i>
                      </button>
                    </div>
                  </div>
                  <div className="cert-row">
                    <span className="cert-label">Issuing Authority:</span>
                    <span className="cert-value">Addl. DGFT, CLA New Delhi</span>
                  </div>
                  <div className="cert-row">
                    <span className="cert-label">Scope:</span>
                    <span className="cert-value text-success">Authorized Worldwide Export</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="cert-card-footer">
                <button
                  type="button"
                  className="cert-btn-primary"
                  onClick={() => handleOpenModal("iec", 0)}
                >
                  <i className="fas fa-expand-arrows-alt"></i> View Full Certificate
                </button>
                <a
                  href="/assets/certificates/iec-certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-btn-secondary"
                  title="Download Official PDF"
                >
                  <i className="fas fa-file-pdf text-danger"></i> Download PDF
                </a>
                <a
                  href="https://dgft.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-btn-secondary"
                  title="Verify on DGFT portal"
                >
                  <i className="fas fa-external-link-alt"></i> Verify on DGFT
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges Strip (4 Pillars) */}
        <div className="trust-summary-strip">
          <div className="trust-points-row">
            <div className="trust-point-item">
              <div className="point-icon">
                <i className="fas fa-file-invoice-dollar"></i>
              </div>
              <div className="point-text">
                <h6>100% Tax Compliant</h6>
                <p>Official GST invoices provided on every order</p>
              </div>
            </div>

            <div className="trust-point-item">
              <div className="point-icon">
                <i className="fas fa-plane-departure"></i>
              </div>
              <div className="point-text">
                <h6>Global Export Ready</h6>
                <p>Licensed DGFT exporter to 50+ countries</p>
              </div>
            </div>

            <div className="trust-point-item">
              <div className="point-icon">
                <i className="fas fa-certificate"></i>
              </div>
              <div className="point-text">
                <h6>Authentic Indian Crafts</h6>
                <p>Direct manufacturer from Sambhal &amp; Moradabad</p>
              </div>
            </div>

            <div className="trust-point-item">
              <div className="point-icon">
                <i className="fas fa-lock"></i>
              </div>
              <div className="point-text">
                <h6>Verified &amp; Secure Trade</h6>
                <p>Bank-grade safe business &amp; transactions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FULL PREVIEW MODAL */}
      {modalCert && (
        <div className="cert-modal-backdrop" onClick={() => setActiveModalCert(null)}>
          <div className="cert-modal-container" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="cert-modal-header">
              <div className="modal-header-left">
                <i className="fas fa-shield-alt text-warning fa-lg"></i>
                <div>
                  <h3>{modalCert.title}</h3>
                  <small style={{ color: "#94a3b8" }}>{modalCert.subtitle}</small>
                </div>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setActiveModalCert(null)}
                title="Close modal"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Modal Navigation / Toolbar */}
            <div className="cert-page-selector">
              <div className="page-tabs">
                {modalCert.pages.map((p, idx) => (
                  <button
                    key={p.page}
                    type="button"
                    className={`page-tab-btn ${activePageIdx === idx ? "active" : ""}`}
                    onClick={() => setActivePageIdx(idx)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="modal-actions-right">
                <a
                  href={modalCert.pdfUrl}
                  download
                  className="modal-tool-btn primary"
                  title="Download Certificate PDF"
                >
                  <i className="fas fa-download"></i> Download PDF
                </a>
                <a
                  href={modalCert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-tool-btn"
                  title="Verify on Government Portal"
                >
                  <i className="fas fa-external-link-alt"></i> Verify Online
                </a>
              </div>
            </div>

            {/* Modal Image Viewer */}
            <div className="cert-modal-body">
              <div className="modal-image-wrapper">
                <img
                  src={modalCert.pages[activePageIdx].img}
                  alt={`${modalCert.title} - ${modalCert.pages[activePageIdx].label}`}
                  className="modal-cert-image"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
