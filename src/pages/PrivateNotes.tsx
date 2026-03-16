import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Notepad from '../components/Notepad';

export default function PrivateNotes() {
    return (
        <div className="flex h-screen bg-[#F6F3EE]">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-[#1F2937]">Private Notes</h1>
                        <p className="text-[#6B7280]">Your secure, auto-saving notepad visible only to you.</p>
                    </div>
                    <div className="h-[600px] w-full max-w-5xl">
                        <Notepad />
                    </div>
                </main>
            </div>
        </div>
    );
}
