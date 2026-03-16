import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Plus, Trash2, FileText, Download } from 'lucide-react';
import api from '../lib/api';
import toast from 'react-hot-toast';

export default function Documents() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [newStatus, setNewStatus] = useState('Draft');
  const [isUploading, setIsUploading] = useState(false);
  const fileBaseUrl = (api.defaults.baseURL || '').replace(/\/api\/?$/, '');

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await api.get('/documents', config);
      setDocuments(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to grab documents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleCreateDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('title', newTitle || selectedFile.name);
      formData.append('status', newStatus);

      setIsUploading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      };
      const response = await api.post('/documents', formData, config);

      if (!response.data?.success) {
        throw new Error('Upload was not confirmed by the server');
      }

      toast.success('Document uploaded');
      setIsModalOpen(false);
      setNewTitle('');
      setSelectedFile(null);
      setNewStatus('Draft');
      await fetchDocuments();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create document');
    } finally {
      setIsUploading(false);
    }
  };

  const getDocumentUrl = (fileUrl: string) =>
    fileUrl?.startsWith('http') ? fileUrl : `${fileBaseUrl}${fileUrl}`;

  const handleOpenDocument = (fileUrl: string) => {
    window.open(getDocumentUrl(fileUrl), '_blank', 'noopener,noreferrer');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this document?')) return;
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await api.delete(`/documents/${id}`, config);
      toast.success('Document deleted');
      fetchDocuments();
    } catch (err: any) {
      toast.error('Failed to delete document');
    }
  };

  return (
    <div className="flex h-screen bg-[#F6F3EE]">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#1F2937] mb-2">Documents</h1>
              <p className="text-[#6B7280]">Manage all your project files, reports, and certifications.</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-5 h-5" /> Upload Document
            </button>
          </div>

          <div className="bg-white rounded-xl border border-[#E5DED6] shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-[#6B7280]">Loading...</div>
            ) : documents.length === 0 ? (
              <div className="p-12 text-center text-[#6B7280]">
                <FileText className="w-12 h-12 mx-auto text-[#E5DED6] mb-4" />
                No documents found. Upload one to get started.
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-[#EFE9E1] border-b border-[#E5DED6]">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-[#6B7280]">Name</th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#6B7280]">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#6B7280]">Date Added</th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#6B7280] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5DED6]">
                  {documents.map((doc) => (
                    <tr key={doc._id} className="hover:bg-[#F6F3EE] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-[#EFE9E1] rounded-lg">
                            <FileText className="w-5 h-5 text-[#6B7280]" />
                          </div>
                          <div>
                            <button
                              type="button"
                              onClick={() => handleOpenDocument(doc.fileUrl)}
                              className="font-medium text-[#1F2937] hover:text-[#2563EB] hover:underline text-left"
                            >
                              {doc.title || doc.fileName}
                            </button>
                            <p className="text-xs text-[#2563EB] truncate">{doc.fileName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            doc.status === 'Published' ? 'bg-[#EFE9E1] text-[#1F2937] border border-[#E5DED6]' : 'bg-[#EFE9E1] text-[#6B7280] border border-[#E5DED6]'
                          }`}
                        >
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#6B7280]">
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 flex justify-end gap-2">
                        <a
                          href={getDocumentUrl(doc.fileUrl)}
                          download={doc.fileName || doc.title}
                          className="p-2 text-[#6B7280] hover:text-[#1F2937] rounded-lg transition-colors"
                        >
                          <Download className="w-5 h-5" />
                        </a>
                        <button
                          onClick={() => handleDelete(doc._id)}
                          className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-[#1F2937] mb-4">Upload Document</h2>
            <form onSubmit={handleCreateDocument} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none"
                  placeholder="e.g. Safety Inspection Q1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">Upload File</label>
                <input
                  type="file"
                  required
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-2 border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none"
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-[#6B7280] hover:bg-[#EFE9E1] rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors disabled:opacity-50"
                >
                  {isUploading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
