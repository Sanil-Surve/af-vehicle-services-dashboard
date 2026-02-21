'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useUser } from '@/hooks/useUser';
import { Button } from '@/components/ui/button';
import { User, Phone, FileText, Upload, CheckCircle, Clock, XCircle, Camera, Save } from 'lucide-react';
import Image from 'next/image';

interface Profile {
    id: string;
    full_name: string;
    phone: string;
    avatar_url: string;
    kyc_document_url: string | null;
    kyc_status: 'not_submitted' | 'submitted' | 'verified' | 'rejected';
}

export default function ProfilePage() {
    const { user, loading: authLoading } = useUser();
    const router = useRouter();
    const supabase = createClient();

    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    // Editable fields
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');

    // Upload states
    const [avatarUploading, setAvatarUploading] = useState(false);
    const [kycUploading, setKycUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
            return;
        }
        if (user) {
            fetchProfile();
        }
    }, [user, authLoading]);

    const fetchProfile = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user!.id)
                .single();

            if (error) throw error;

            setProfile(data as Profile);
            setFullName(data.full_name || '');
            setPhone(data.phone || '');
            setAvatarUrl(data.avatar_url || '');
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const uploadFile = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) throw new Error('Upload failed');
        const data = await res.json();
        return data.url;
    };

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type (images only for avatar)
        if (!file.type.startsWith('image/')) {
            setMessage({ type: 'error', text: 'Please select an image file for avatar' });
            return;
        }

        try {
            setAvatarUploading(true);
            setMessage(null);
            const url = await uploadFile(file);
            setAvatarUrl(url);
            setMessage({ type: 'success', text: 'Avatar uploaded! Click Save to apply changes.' });
        } catch {
            setMessage({ type: 'error', text: 'Failed to upload avatar' });
        } finally {
            setAvatarUploading(false);
        }
    };

    const handleKycUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
            setMessage({ type: 'error', text: 'Please upload a PDF or image file (JPEG, PNG, WebP)' });
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setMessage({ type: 'error', text: 'File size must be less than 5MB' });
            return;
        }

        try {
            setKycUploading(true);
            setMessage(null);
            const url = await uploadFile(file);

            // Update profile with KYC document URL and status
            const { error } = await supabase
                .from('profiles')
                .update({
                    kyc_document_url: url,
                    kyc_status: 'submitted',
                })
                .eq('id', user!.id);

            if (error) throw error;

            setProfile(prev => prev ? { ...prev, kyc_document_url: url, kyc_status: 'submitted' } : null);
            setMessage({ type: 'success', text: 'KYC document uploaded successfully! Pending admin verification.' });
        } catch {
            setMessage({ type: 'error', text: 'Failed to upload KYC document' });
        } finally {
            setKycUploading(false);
        }
    };

    const handleSaveProfile = async () => {
        try {
            setSaving(true);
            setMessage(null);

            const { error } = await supabase
                .from('profiles')
                .update({
                    full_name: fullName.trim(),
                    phone: phone.trim(),
                    avatar_url: avatarUrl,
                })
                .eq('id', user!.id);

            if (error) throw error;

            setProfile(prev => prev ? {
                ...prev,
                full_name: fullName.trim(),
                phone: phone.trim(),
                avatar_url: avatarUrl,
            } : null);

            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch {
            setMessage({ type: 'error', text: 'Failed to update profile' });
        } finally {
            setSaving(false);
        }
    };

    if (authLoading || loading) {
        return (
            <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <p className="text-muted-foreground">Profile not found.</p>
            </div>
        );
    }

    const kycStatusConfig = {
        not_submitted: { label: 'Not Submitted', icon: FileText, color: 'text-muted-foreground', bg: 'bg-muted' },
        submitted: { label: 'Pending Verification', icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30' },
        verified: { label: 'Verified', icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/30' },
        rejected: { label: 'Rejected', icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30' },
    };

    const kycInfo = kycStatusConfig[profile.kyc_status || 'not_submitted'];
    const KycIcon = kycInfo.icon;

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <h1 className="text-3xl font-bold mb-8">My Profile</h1>

            {/* Message */}
            {message && (
                <div className={`mb-6 rounded-lg p-4 border ${message.type === 'success'
                    ? 'bg-green-500/10 border-green-500/30 text-green-400'
                    : 'bg-destructive/10 border-destructive/30 text-destructive'
                    }`}>
                    <p className="text-sm">{message.text}</p>
                </div>
            )}

            <div className="space-y-6">
                {/* Avatar & Basic Info Card */}
                <div className="bg-card rounded-2xl shadow-xl p-6 md:p-8 border border-border/50">
                    <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                        {/* Avatar */}
                        <div className="relative group">
                            <div className="relative w-28 h-28 rounded-full overflow-hidden bg-muted border-4 border-primary/20">
                                {avatarUrl ? (
                                    <Image
                                        src={avatarUrl}
                                        alt="Profile Avatar"
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-primary/10">
                                        <User className="h-12 w-12 text-primary/50" />
                                    </div>
                                )}
                            </div>
                            <label className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground cursor-pointer shadow-lg hover:bg-primary/90 transition-colors">
                                {avatarUploading ? (
                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <Camera className="h-4 w-4" />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarUpload}
                                    disabled={avatarUploading}
                                />
                            </label>
                        </div>

                        <div className="text-center sm:text-left">
                            <h2 className="text-xl font-bold">{profile.full_name || 'No name set'}</h2>
                            <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                    </div>

                    {/* Editable Fields */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1.5">
                                <User className="inline h-4 w-4 mr-1.5 text-muted-foreground" />
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Enter your full name"
                                className="w-full border border-border bg-background text-foreground rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow [color-scheme:dark]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5">
                                <Phone className="inline h-4 w-4 mr-1.5 text-muted-foreground" />
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter your phone number"
                                className="w-full border border-border bg-background text-foreground rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow [color-scheme:dark]"
                            />
                        </div>

                        <Button
                            onClick={handleSaveProfile}
                            disabled={saving}
                            className="w-full h-11 font-semibold"
                        >
                            {saving ? (
                                <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <Save className="h-4 w-4 mr-2" />
                            )}
                            {saving ? 'Saving...' : 'Save Profile'}
                        </Button>
                    </div>
                </div>

                {/* KYC Section */}
                <div className="bg-card rounded-2xl shadow-xl p-6 md:p-8 border border-border/50">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="h-1 w-8 bg-primary rounded"></div>
                            <h3 className="text-lg font-bold">KYC Verification</h3>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${kycInfo.bg} ${kycInfo.color}`}>
                            <KycIcon className="h-3.5 w-3.5" />
                            {kycInfo.label}
                        </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-6">
                        Upload a copy of your Driving Licence or any valid ID document for verification. Accepted formats: PDF, JPEG, PNG (max 5MB).
                    </p>

                    {/* Current Document */}
                    {profile.kyc_document_url && (
                        <div className="mb-4 rounded-lg border border-border bg-muted/30 p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                        <FileText className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">KYC Document</p>
                                        <p className="text-xs text-muted-foreground">Uploaded document</p>
                                    </div>
                                </div>
                                <a
                                    href={profile.kyc_document_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-primary hover:underline font-medium"
                                >
                                    View Document
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Upload Area */}
                    {(profile.kyc_status === 'not_submitted' || profile.kyc_status === 'rejected') && (
                        <label className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${kycUploading
                            ? 'border-primary/50 bg-primary/5'
                            : 'border-border hover:border-primary/50 hover:bg-muted/30'
                            }`}>
                            {kycUploading ? (
                                <div className="flex flex-col items-center">
                                    <svg className="animate-spin h-8 w-8 text-primary mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <p className="text-sm text-primary">Uploading...</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                    <p className="text-sm text-muted-foreground">
                                        <span className="font-semibold text-primary">Click to upload</span> your document
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">PDF, JPEG, PNG, WebP (max 5MB)</p>
                                </div>
                            )}
                            <input
                                type="file"
                                accept=".pdf,image/jpeg,image/png,image/webp"
                                className="hidden"
                                onChange={handleKycUpload}
                                disabled={kycUploading}
                            />
                        </label>
                    )}

                    {profile.kyc_status === 'submitted' && (
                        <div className="rounded-lg bg-yellow-500/5 border border-yellow-500/20 p-4 text-center">
                            <Clock className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                            <p className="text-sm text-yellow-400 font-medium">Your document is under review</p>
                            <p className="text-xs text-muted-foreground mt-1">This usually takes 24–48 hours</p>
                        </div>
                    )}

                    {profile.kyc_status === 'verified' && (
                        <div className="rounded-lg bg-green-500/5 border border-green-500/20 p-4 text-center">
                            <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
                            <p className="text-sm text-green-400 font-medium">Your identity has been verified</p>
                        </div>
                    )}

                    {profile.kyc_status === 'rejected' && !kycUploading && (
                        <p className="text-xs text-destructive mt-3">
                            Your previous document was rejected. Please upload a valid document.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}