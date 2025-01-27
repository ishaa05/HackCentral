import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useEditor, EditorContent } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import TextAlign from '@tiptap/extension-text-align';
import { Link } from 'react-router-dom';
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  List as ListIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ExternalLink,
} from 'lucide-react';
import ChatRoom from './ChatRoom';

const DocumentEditor = () => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [fontSize, setFontSize] = useState('16px');

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Underline,
      BulletList,
      ListItem,
      TextAlign.configure({
        types: ['paragraph'],
      }),
    ],
    content: '<p>Start typing...</p>',
    onUpdate: ({ editor }) => {
      socket?.emit('edit-document', 'doc1', { content: editor.getHTML() });
    },
  });

  useEffect(() => {
    const socketInstance = io('http://localhost:4000', { withCredentials: true });
    setSocket(socketInstance);
    socketInstance.on('connect', () => setConnected(true));
    socketInstance.on('disconnect', () => setConnected(false));
    socketInstance.on('document-updated', (document) => {
      editor?.commands.setContent(document.content);
    });
    socketInstance.emit('join-document', 'doc1');

    return () => socketInstance.disconnect();
  }, [editor]);

  const tools = [
    { name: 'Canva', url: 'https://www.canva.com', color: 'bg-[#1A5F7A]', description: 'Design graphics & presentations' },
    { name: 'Figma', url: 'https://www.figma.com', color: 'bg-[#2C3E50]', description: 'Interface design tool' },
    { name: 'Notion', url: 'https://notion.so', color: 'bg-[#8E1D3A]', description: 'Workspace for notes & projects' },
    { name: 'Miro', url: 'https://miro.com', color: 'bg-[#003459]', description: 'Collaborative whiteboard' },
    { name: 'Jamboard', url: 'https://jamboard.google.com', color: 'bg-[#4A154B]', description: 'Digital whiteboard' },
  ];

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#F0F4F8]">
      <div className="w-80 bg-[#1A2C3A] p-6 space-y-8 text-white">
        <h2 className="text-xl font-bold mb-6">Creative Tools</h2>
        {tools.map((tool) => (
          <div key={tool.name} className="space-y-2">
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block p-4 rounded-lg text-white ${tool.color} hover:opacity-90 transition-opacity flex justify-between items-center group`}
            >
              {tool.name}
              <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <p className="text-sm text-gray-300 px-2">{tool.description}</p>
          </div>
        ))}
      </div>

      <div className="flex-1 bg-[#F0F4F8] p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-6 border border-[#1A2C3A]">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-[#1A2C3A]">
                Real-Time Document Collaboration
              </h1>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    connected ? 'bg-green-600' : 'bg-[#8E1D3A]'
                  }`}
                />
                <span className="text-sm text-gray-700">
                  {connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>

            <div className="bg-gray-100 p-2 rounded-lg mb-4 flex items-center gap-2">
              <select
                onChange={(e) => {
                  setFontSize(e.target.value);
                  const element = editor.view.dom;
                  element.style.fontSize = e.target.value;
                }}
                value={fontSize}
                className="p-2 rounded border border-[#1A2C3A] text-[#1A2C3A]"
              >
                <option value="14px">14px</option>
                <option value="16px">16px</option>
                <option value="18px">18px</option>
                <option value="20px">20px</option>
              </select>

              <div className="flex flex-wrap gap-2">
                {/* Formatting buttons with navy blue and red color scheme */}
                <div className="flex gap-1">
                  <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 rounded hover:bg-gray-200 ${
                      editor.isActive('bold') ? 'bg-[#1A2C3A] text-white' : ''
                    }`}
                  >
                    <BoldIcon size={18} />
                  </button>
                  <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded hover:bg-gray-200 ${
                      editor.isActive('italic') ? 'bg-[#1A2C3A] text-white' : ''
                    }`}
                  >
                    <ItalicIcon size={18} />
                  </button>
                  <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`p-2 rounded hover:bg-gray-200 ${
                      editor.isActive('underline') ? 'bg-[#1A2C3A] text-white' : ''
                    }`}
                  >
                    <UnderlineIcon size={18} />
                  </button>
                </div>

                <div className="w-px h-8 bg-gray-300 mx-2" />

                <div className="flex gap-1">
                  <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded hover:bg-gray-200 ${
                      editor.isActive('bulletList') ? 'bg-[#1A2C3A] text-white' : ''
                    }`}
                  >
                    <ListIcon size={18} />
                  </button>
                </div>

                <div className="w-px h-8 bg-gray-300 mx-2" />

                <div className="flex gap-1">
                  <button
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={`p-2 rounded hover:bg-gray-200 ${
                      editor.isActive({ textAlign: 'left' }) ? 'bg-[#1A2C3A] text-white' : ''
                    }`}
                  >
                    <AlignLeft size={18} />
                  </button>
                  <button
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={`p-2 rounded hover:bg-gray-200 ${
                      editor.isActive({ textAlign: 'center' }) ? 'bg-[#1A2C3A] text-white' : ''
                    }`}
                  >
                    <AlignCenter size={18} />
                  </button>
                  <button
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={`p-2 rounded hover:bg-gray-200 ${
                      editor.isActive({ textAlign: 'right' }) ? 'bg-[#1A2C3A] text-white' : ''
                    }`}
                  >
                    <AlignRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full p-4 border border-[#1A2C3A] rounded-lg focus-within:ring-2 focus-within:ring-[#8E1D3A] focus-within:border-transparent outline-none transition-all duration-200 shadow-inner bg-gray-50 hover:bg-white min-h-[300px]">
              <EditorContent editor={editor} />
            </div>

            <div className="mt-4 text-sm text-gray-700 flex justify-between items-center">
              <span>{editor.storage.characterCount?.characters() || 0} characters</span>
              <span className="text-[#1A2C3A]">Changes save automatically</span>
            </div>
          </div>
          <Link
            to="/video"
            className="mt-4 bg-[#8E1D3A] text-white px-4 py-2 rounded hover:bg-[#6C1524] inline-block text-center"
          >
            Video Chat 
          </Link>
        </div>
      </div>
      <ChatRoom/>
    </div>
  );
};

export default DocumentEditor;