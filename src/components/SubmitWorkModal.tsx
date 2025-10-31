"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Upload, FileText, Link2, CheckCircle } from "lucide-react";

interface SubmitWorkModalProps {
  open: boolean;
  onClose: () => void;
  gigTitle: string;
  milestone?: string;
}

export default function SubmitWorkModal({
  open,
  onClose,
  gigTitle,
  milestone = "Final Delivery",
}: SubmitWorkModalProps) {
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [deliveryLink, setDeliveryLink] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = () => {
    // Handle submission
    alert(
      "Work submitted successfully! The client will review your submission.",
    );
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto glass-effect border-border/40">
        <DialogHeader>
          <DialogTitle className="text-2xl">Submit Your Work</DialogTitle>
          <DialogDescription>
            Submit deliverables for: {gigTitle}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Milestone Info */}
          <Card className="p-4 bg-primary/10 border-primary/30">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold text-sm">Milestone: {milestone}</p>
                <p className="text-xs text-muted-foreground">
                  Make sure all requirements are met before submission
                </p>
              </div>
            </div>
          </Card>

          {/* Delivery Notes */}
          <div className="space-y-2">
            <Label htmlFor="deliveryNotes">Delivery Notes</Label>
            <Textarea
              id="deliveryNotes"
              placeholder="Describe what you've completed, any important notes, or instructions for the client..."
              rows={6}
              value={deliveryNotes}
              onChange={(e) => setDeliveryNotes(e.target.value)}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Provide clear details about your deliverables
            </p>
          </div>

          {/* Delivery Link */}
          <div className="space-y-2">
            <Label htmlFor="deliveryLink">Delivery Link (Optional)</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="deliveryLink"
                  placeholder="https://github.com/your-repo or https://demo.yourproject.com"
                  value={deliveryLink}
                  onChange={(e) => setDeliveryLink(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              GitHub repo, demo link, or any external resource
            </p>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="files">Upload Files</Label>
            <div className="border-2 border-dashed border-border/40 rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <div className="text-center">
                  <Label
                    htmlFor="files"
                    className="text-sm font-medium cursor-pointer hover:text-primary"
                  >
                    Click to upload files
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload source code, designs, documents, etc. (Max 100MB)
                  </p>
                </div>
                <Input
                  id="files"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              {files && files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {Array.from(files).map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-secondary/20 rounded"
                    >
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm flex-1 truncate">
                        {file.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Important Notice */}
          <Card className="p-4 bg-accent/10 border-accent/30">
            <h4 className="font-semibold text-sm mb-2">Before Submitting:</h4>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              <li>Ensure all requirements from the gig description are met</li>
              <li>Test your deliverables thoroughly</li>
              <li>Include clear instructions if needed</li>
              <li>Double-check all files and links are accessible</li>
            </ul>
          </Card>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="flex-1 crypto-gradient text-white"
              onClick={handleSubmit}
              disabled={!deliveryNotes.trim()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Submit Work
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
