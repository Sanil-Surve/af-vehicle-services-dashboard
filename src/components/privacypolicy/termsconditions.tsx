"use client"

import { useState } from "react";

interface TermsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAccept?: () => void;
}

export default function TermsConditionsModal({ isOpen, onClose, onAccept }: TermsModalProps) {
    const [accepted, setAccepted] = useState(false);

    if (!isOpen) return null;

    const handleAccept = () => {
        if (!accepted) return;
        if (onAccept) onAccept();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="terms-title"
                className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-card text-card-foreground p-6 shadow-xl border border-border"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 id="terms-title" className="text-xl font-bold mb-3">Terms & Conditions</h2>

                <p className="text-sm text-muted-foreground mb-4">
                    Please read and accept the following terms before proceeding with the booking/hire.
                </p>

                <div className="space-y-3 text-sm">
                    <p className="font-medium">Important:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            If submission happens before the mentioned slab days (for example: 7 days), the rent will be adjusted according to the applicable slabs.
                        </li>
                        <li>
                            Minor scratches and dents are not considered damage — the customer will not be held responsible for minor cosmetic marks.
                        </li>
                        <li>
                            Accidental damage and any breakages due to which we are not able to rent the vehicle to another customer will be the customer&apos;s responsibility.
                        </li>
                        <li>
                            Any damages or injuries that happen to the customer or to a third party while riding the vehicle will be the customer&apos;s responsibility.
                        </li>
                        <li>
                            Internal mechanical or battery damage is the company&apos;s responsibility. In such cases, the customer will either receive a replacement vehicle or nearby mechanical support may be provided.
                            However, the company is only liable for internal damage for the first 500 kms after hiring the bike or scooter, or for 10 days from the start of hire, whichever comes first.
                        </li>
                        <li>
                            Tyre-related problems (for example punctures) are not covered and are the customer&apos;s responsibility, whether it&apos;s one tyre or multiple tyres.
                        </li>
                    </ul>
                </div>

                <div className="mt-5 border-t border-border pt-4 flex items-start gap-3">
                    <input
                        id="accept-terms"
                        type="checkbox"
                        checked={accepted}
                        onChange={(e) => setAccepted(e.target.checked)}
                        className="mt-1 h-4 w-4"
                    />
                    <label htmlFor="accept-terms" className="text-sm">
                        I have read and agree to the Terms & Conditions above.
                    </label>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-border rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Close
                    </button>

                    <button
                        onClick={handleAccept}
                        disabled={!accepted}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
}
