'use client';

import { useEffect, useState } from 'react';
import { feedbackService } from '@/services/feedback.service';
import { Feedback } from '@/types/feedback';
import { Star, Check, X, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

export default function AdminFeedbackPage() {
    const [feedback, setFeedback] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all');

    useEffect(() => {
        loadFeedback();
    }, []);

    const loadFeedback = async () => {
        try {
            const data = await feedbackService.getAllFeedback();
            setFeedback(data);
        } catch (error) {
            console.error('Failed to load feedback:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleApproval = async (id: string, currentStatus: boolean) => {
        try {
            await feedbackService.toggleApproval(id, !currentStatus);
            setFeedback(prev =>
                prev.map(fb => fb.id === id ? { ...fb, is_approved: !currentStatus } : fb)
            );
        } catch (error) {
            console.error('Failed to toggle approval:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this feedback?')) return;
        try {
            await feedbackService.deleteFeedback(id);
            setFeedback(prev => prev.filter(fb => fb.id !== id));
        } catch (error) {
            console.error('Failed to delete feedback:', error);
        }
    };

    const filteredFeedback = feedback.filter(fb => {
        if (filter === 'approved') return fb.is_approved;
        if (filter === 'pending') return !fb.is_approved;
        return true;
    });

    const approvedCount = feedback.filter(fb => fb.is_approved).length;
    const pendingCount = feedback.filter(fb => !fb.is_approved).length;

    if (loading) return <div>Loading feedback...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Feedback</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage customer reviews shown on the home page
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-2xl font-bold mt-1">{feedback.length}</p>
                </div>
                <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-4 shadow-sm">
                    <p className="text-sm text-green-400">Approved</p>
                    <p className="text-2xl font-bold mt-1 text-green-400">{approvedCount}</p>
                </div>
                <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4 shadow-sm">
                    <p className="text-sm text-yellow-400">Hidden</p>
                    <p className="text-2xl font-bold mt-1 text-yellow-400">{pendingCount}</p>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2">
                {(['all', 'approved', 'pending'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === tab
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        {tab === 'all' ? 'All' : tab === 'approved' ? 'Approved' : 'Hidden'}
                        <span className="ml-1.5 opacity-70">
                            ({tab === 'all' ? feedback.length : tab === 'approved' ? approvedCount : pendingCount})
                        </span>
                    </button>
                ))}
            </div>

            {/* Feedback List */}
            {filteredFeedback.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    No feedback found.
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredFeedback.map((fb) => (
                        <div
                            key={fb.id}
                            className={`rounded-xl border p-5 shadow-sm transition-colors ${fb.is_approved
                                    ? 'border-border bg-card'
                                    : 'border-yellow-500/20 bg-yellow-500/5'
                                }`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                {/* Left: Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-semibold">{fb.name}</h3>
                                        {fb.location && (
                                            <span className="text-xs text-muted-foreground">• {fb.location}</span>
                                        )}
                                        {fb.email && (
                                            <span className="text-xs text-muted-foreground">• {fb.email}</span>
                                        )}
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${fb.is_approved
                                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                            }`}>
                                            {fb.is_approved ? 'Approved' : 'Hidden'}
                                        </span>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1 mb-2">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < fb.rating
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'fill-muted text-muted-foreground/30'
                                                    }`}
                                            />
                                        ))}
                                        <span className="text-xs text-muted-foreground ml-1">{fb.rating}/5</span>
                                    </div>

                                    {/* Review */}
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        &quot;{fb.review}&quot;
                                    </p>

                                    <p className="text-xs text-muted-foreground mt-2">
                                        {format(new Date(fb.created_at), 'MMM dd, yyyy \'at\' hh:mm a')}
                                    </p>
                                </div>

                                {/* Right: Actions */}
                                <div className="flex items-center gap-2 shrink-0">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleToggleApproval(fb.id, fb.is_approved)}
                                        className={fb.is_approved
                                            ? 'text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/10'
                                            : 'text-green-400 border-green-500/30 hover:bg-green-500/10'
                                        }
                                        title={fb.is_approved ? 'Hide from home page' : 'Show on home page'}
                                    >
                                        {fb.is_approved ? (
                                            <><EyeOff className="h-4 w-4 mr-1.5" /> Hide</>
                                        ) : (
                                            <><Eye className="h-4 w-4 mr-1.5" /> Approve</>
                                        )}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(fb.id)}
                                        className="text-destructive border-destructive/30 hover:bg-destructive/10"
                                        title="Delete feedback"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
