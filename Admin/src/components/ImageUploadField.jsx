import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Loader2, Trash2, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';

const BACKEND_URL = (import.meta.env && import.meta.env.VITE_BACKEND_URL) || 'http://localhost:5000';

/**
 * Helper to normalize image preview URL in Admin
 */
const resolvePreviewUrl = (url) => {
  if (!url || typeof url !== 'string' || url.trim() === '') return '';
  const clean = url.trim();
  if (clean.startsWith('http://') || clean.startsWith('https://') || clean.startsWith('data:')) {
    return clean;
  }
  if (clean.startsWith('/uploads/') || clean.startsWith('uploads/')) {
    const path = clean.startsWith('/') ? clean : `/${clean}`;
    return `${BACKEND_URL}${path}`;
  }
  // Storefront static assets
  if (clean.startsWith('/assets/') || clean.startsWith('assets/')) {
    const path = clean.startsWith('/') ? clean : `/${clean}`;
    return `http://localhost:5173${path}`;
  }
  if (clean.startsWith('/')) {
    return clean;
  }
  return `/${clean}`;
};

/**
 * Modern Image Upload & URL Input Component for Admin Dashboard
 * Supports folder-wise upload categorization (hero, categories, banners, products, collections, team)
 */
const ImageUploadField = ({
  label = 'Image',
  value = '',
  onChange,
  folder = 'general',
  placeholder = 'Select an image file or paste URL (e.g. http://... or assets/...)',
  helpText = 'Supports PNG, JPG, JPEG, WEBP, SVG up to 15MB',
  compact = false,
  previewHeight = 72,
  required = false,
  className = '',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [imgError, setImgError] = useState(false);
  const fileInputRef = useRef(null);

  // Trigger file selection dialog
  const handleTriggerUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset input to allow selecting same file again
      fileInputRef.current.click();
    }
  };

  // Upload file to Backend API with folder organization
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side size check (15MB limit)
    const maxSize = 15 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadError('File size exceeds 15MB limit.');
      return;
    }

    setIsUploading(true);
    setUploadError('');
    setUploadSuccess(false);
    setImgError(false);

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('folder', folder || 'general');

      const uploadUrl = `${BACKEND_URL}/api/upload?folder=${encodeURIComponent(folder || 'general')}`;
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success && data.imageUrl) {
        setUploadSuccess(true);
        onChange?.(data.imageUrl);
        setTimeout(() => setUploadSuccess(false), 3000);
      } else {
        throw new Error(data.message || 'Upload failed. Please try again.');
      }
    } catch (err) {
      console.error('[Image Upload Error]:', err);
      setUploadError(err.message || 'Failed to upload image. Ensure backend is running.');
    } finally {
      setIsUploading(false);
    }
  };

  // Clear image handler
  const handleClear = () => {
    onChange?.('');
    setUploadError('');
    setUploadSuccess(false);
    setImgError(false);
  };

  const hasValue = Boolean(value && value.trim() !== '');
  const previewSrc = resolvePreviewUrl(value);

  return (
    <div className={`image-upload-field-container ${className}`} style={{ marginBottom: compact ? '8px' : '14px' }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <label style={{ fontSize: compact ? '11px' : '12px', fontWeight: 600, color: '#334155', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span>{label}</span>
            {folder && (
              <span
                style={{
                  fontSize: '9.5px',
                  fontWeight: 700,
                  color: '#64748B',
                  backgroundColor: '#F1F5F9',
                  padding: '1px 5px',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                }}
              >
                📁 {folder}
              </span>
            )}
            {required && <span style={{ color: '#DC2626' }}>*</span>}
          </label>
          {uploadSuccess && (
            <span style={{ fontSize: '11px', color: '#16A34A', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}>
              <CheckCircle2 size={13} /> Saved in /{folder}!
            </span>
          )}
        </div>
      )}

      {/* Hidden Native File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml,image/gif"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        {/* Live Thumbnail Preview Box */}
        <div
          style={{
            width: compact ? '54px' : '74px',
            height: compact ? `${previewHeight || 54}px` : `${previewHeight || 74}px`,
            borderRadius: '10px',
            border: '1.5px solid #E2E8F0',
            backgroundColor: '#F8FAFC',
            overflow: 'hidden',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
          title={hasValue ? 'Image Preview' : 'No image chosen'}
        >
          {hasValue && !imgError && previewSrc ? (
            <img
              src={previewSrc}
              alt="Preview"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={() => setImgError(true)}
              onLoad={() => setImgError(false)}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}>
              <ImageIcon size={compact ? 20 : 26} opacity={0.6} />
              <span style={{ fontSize: '9px', fontWeight: 600, marginTop: '2px', color: '#94A3B8' }}>
                {imgError ? 'Invalid' : 'Preview'}
              </span>
            </div>
          )}

          {isUploading && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(15, 23, 42, 0.65)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
              }}
            >
              <Loader2 size={18} className="animate-spin" />
            </div>
          )}
        </div>

        {/* Input & Action Controls */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {/* Direct URL text input */}
            <input
              type="text"
              className="input-field"
              value={value || ''}
              onChange={(e) => {
                setImgError(false);
                onChange?.(e.target.value);
              }}
              placeholder={placeholder}
              style={{
                flex: 1,
                fontSize: compact ? '12px' : '13px',
                padding: compact ? '7px 10px' : '9px 12px',
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                border: uploadError ? '1px solid #EF4444' : '1px solid #CBD5E1',
              }}
            />

            {/* Upload from Computer Button */}
            <button
              type="button"
              onClick={handleTriggerUpload}
              disabled={isUploading}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: compact ? '7px 12px' : '9px 16px',
                borderRadius: '8px',
                backgroundColor: isUploading ? '#94A3B8' : '#CC0D39',
                color: '#FFFFFF',
                fontSize: compact ? '12px' : '13px',
                fontWeight: 700,
                border: 'none',
                cursor: isUploading ? 'not-allowed' : 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 6px rgba(204, 13, 57, 0.2)',
              }}
              onMouseEnter={(e) => {
                if (!isUploading) e.currentTarget.style.backgroundColor = '#A3082D';
              }}
              onMouseLeave={(e) => {
                if (!isUploading) e.currentTarget.style.backgroundColor = '#CC0D39';
              }}
            >
              {isUploading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <UploadCloud size={15} />
                  <span>Upload</span>
                </>
              )}
            </button>

            {/* Clear Button */}
            {hasValue && (
              <button
                type="button"
                onClick={handleClear}
                style={{
                  padding: compact ? '7px 10px' : '9px 12px',
                  borderRadius: '8px',
                  backgroundColor: '#F1F5F9',
                  color: '#64748B',
                  border: '1px solid #E2E8F0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Clear Image"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FEE2E2';
                  e.currentTarget.style.color = '#DC2626';
                  e.currentTarget.style.borderColor = '#FCA5A5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#F1F5F9';
                  e.currentTarget.style.color = '#64748B';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                }}
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>

          {/* Helper / Error Feedback */}
          {uploadError ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#DC2626', fontSize: '11.5px', fontWeight: 600 }}>
              <AlertCircle size={13} />
              <span>{uploadError}</span>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#94A3B8' }}>
              <span>{helpText} (Saved in <code>uploads/{folder}/</code>)</span>
              {hasValue && previewSrc.startsWith('http') && (
                <a
                  href={previewSrc}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#CC0D39', display: 'flex', alignItems: 'center', gap: '2px', textDecoration: 'none', fontWeight: 600 }}
                >
                  <span>Open Full</span>
                  <ExternalLink size={10} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploadField;
