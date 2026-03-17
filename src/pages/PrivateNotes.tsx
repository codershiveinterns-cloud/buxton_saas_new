import AppShell from '../components/AppShell';
import Notepad from '../components/Notepad';

export default function PrivateNotes() {
    return (
        <AppShell contentClassName="p-4 sm:p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#1F2937] sm:text-3xl">Private Notes</h1>
                <p className="text-sm text-[#6B7280] sm:text-base">Your secure, auto-saving notepad visible only to you.</p>
            </div>
            <div className="h-[70vh] min-h-[500px] w-full max-w-5xl">
                <Notepad />
            </div>
        </AppShell>
    );
}
