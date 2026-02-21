'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { CheckCircle, XCircle, Clock, FileText, ExternalLink } from 'lucide-react';

interface Profile {
    id: string;
    full_name: string;
    phone: string;
    avatar_url: string;
    role: string;
    kyc_document_url: string | null;
    kyc_status: 'not_submitted' | 'submitted' | 'verified' | 'rejected';
    created_at: string;
}

const kycStatusConfig = {
    not_submitted: { label: 'Not Submitted', color: 'bg-muted text-muted-foreground' },
    submitted: { label: 'Pending', color: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' },
    verified: { label: 'Verified', color: 'bg-green-500/20 text-green-400 border border-green-500/30' },
    rejected: { label: 'Rejected', color: 'bg-red-500/20 text-red-400 border border-red-500/30' },
};

export default function AdminUsersPage() {
    const [users, setUsers] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'submitted' | 'verified' | 'rejected'>('all');

    const supabase = createClient();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setUsers(data);
        setLoading(false);
    };

    const handleKycStatusChange = async (userId: string, newStatus: 'verified' | 'rejected') => {
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ kyc_status: newStatus })
                .eq('id', userId);

            if (error) throw error;

            setUsers(prev =>
                prev.map(u => u.id === userId ? { ...u, kyc_status: newStatus } : u)
            );
        } catch (error) {
            console.error('Failed to update KYC status:', error);
        }
    };

    const filteredUsers = users.filter(u => {
        if (filter === 'all') return true;
        return u.kyc_status === filter;
    });

    const submittedCount = users.filter(u => u.kyc_status === 'submitted').length;

    if (loading) return <div>Loading users...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                    {submittedCount > 0 && (
                        <p className="text-sm text-yellow-400 mt-1">
                            {submittedCount} KYC {submittedCount === 1 ? 'document' : 'documents'} pending review
                        </p>
                    )}
                </div>
            </div>

            {/* KYC Filter Tabs */}
            <div className="flex gap-2">
                {(['all', 'submitted', 'verified', 'rejected'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === tab
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        {tab === 'all' ? 'All Users' : tab === 'submitted' ? 'Pending KYC' : tab === 'verified' ? 'Verified' : 'Rejected'}
                        <span className="ml-1.5 opacity-70">
                            ({tab === 'all' ? users.length : users.filter(u => u.kyc_status === tab).length})
                        </span>
                    </button>
                ))}
            </div>

            <div className="border border-border rounded-lg bg-card overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted-foreground uppercase bg-muted border-b border-border">
                        <tr>
                            <th className="px-6 py-3">User</th>
                            <th className="px-6 py-3">Phone</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">KYC Status</th>
                            <th className="px-6 py-3">KYC Document</th>
                            <th className="px-6 py-3">Joined</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => {
                            const kyc = kycStatusConfig[user.kyc_status || 'not_submitted'];
                            return (
                                <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={user.avatar_url} />
                                                <AvatarFallback>{user.full_name?.[0] || 'U'}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium text-foreground">{user.full_name || 'No Name'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {user.phone || <span className="text-muted-foreground">—</span>}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs capitalize ${user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-muted text-muted-foreground'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${kyc.color}`}>
                                            {kyc.label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.kyc_document_url ? (
                                            <a
                                                href={user.kyc_document_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
                                            >
                                                <FileText className="h-3.5 w-3.5" />
                                                View
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">—</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                                        {format(new Date(user.created_at), 'MMM dd, yyyy')}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.kyc_status === 'submitted' ? (
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleKycStatusChange(user.id, 'verified')}
                                                    className="text-green-400 border-green-500/30 hover:bg-green-500/10"
                                                >
                                                    <CheckCircle className="h-4 w-4 mr-1" />
                                                    Verify
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleKycStatusChange(user.id, 'rejected')}
                                                    className="text-red-400 border-red-500/30 hover:bg-red-500/10"
                                                >
                                                    <XCircle className="h-4 w-4 mr-1" />
                                                    Reject
                                                </Button>
                                            </div>
                                        ) : user.kyc_status === 'verified' ? (
                                            <span className="inline-flex items-center gap-1 text-xs text-green-400">
                                                <CheckCircle className="h-3.5 w-3.5" />
                                                Verified
                                            </span>
                                        ) : user.kyc_status === 'rejected' ? (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleKycStatusChange(user.id, 'verified')}
                                                className="text-green-400 border-green-500/30 hover:bg-green-500/10"
                                            >
                                                <CheckCircle className="h-4 w-4 mr-1" />
                                                Re-verify
                                            </Button>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">
                                                <Clock className="h-3.5 w-3.5 inline mr-1" />
                                                Awaiting upload
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
