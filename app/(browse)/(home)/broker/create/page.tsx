"use client";

import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import QRCode from "qrcode.react"; 
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useCurrentUser } from '@/hooks/use-current-user'; 

const codeUrl = uuidv4(); 
export function DialogDemo({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useCurrentUser();  
  const [loading, setLoading] = useState(false); 
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); 
  const [price, setPrice] = useState(""); 
  const [qrCodeValue, setQRCodeValue] = useState(""); 
  const [error, setError] = useState(""); 

// Logic to open the dialog
const handleOpen = () => setIsOpen(true);

// Logic to close the dialog
const handleClose = () => {
  setStep(1);
  setPrice("");
  setQRCodeValue("");
  setError("");
  setIsOpen(false); // Close the dialog
  // router.refresh();
};

  // Check if user is logged in before allowing interaction
  useEffect(() => {
    if (!user) {
      setError("You need to be logged in to generate a QR code.");
    } else {
      setError(""); // Clear error if user is logged in
    }
  }, [user]);

  const priceAsNumber = parseFloat(price);

  // Handle the "Next" step to move to step 2 (QR code generation)
  const handleNext = () => {
    if (price && user) {
      // Generate the QR code value using the price and a predefined URL
      setQRCodeValue(JSON.stringify({
      
        codeUrl,  // Optionally send the unique URL for the QR code
        title: priceAsNumber,  // Title or price
        websiteLink: "http://e-qalam.com/broker/scan",
      }));
      setStep(2);  // Move to step 2 (confirmation)
    } else if (!user) {
      setError("You must be logged in to proceed.");  // Error if user is not logged in
    }
  };
 const handleSave = async () => {
    if (!user) {
      setError("You need to be logged in to save the QR code.");
      return;
    }
    if (loading) return; 
    try {
      setLoading(true);
      // Send the price and QR code data to the API
      const response = await axios.post("/api/code", {
        title: price,  // Title or price
        qrCodeData: JSON.parse(qrCodeValue),  // Send the generated QR code data
        codeUrl,  // Optionally send the unique URL for the QR code
      });
      handleClose();
      router.refresh();
      setLoading(false)
    } catch (error) {
      console.error("Error saving QR code", error);
      setError("An error occurred while saving the QR code.");
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? "Enter Price" : "Confirm Price"}
          </DialogTitle>
          <DialogDescription>
            {step === 1
              ? "Please enter the price you'd like to set."
              : "Please confirm the price you entered."}
          </DialogDescription>
        </DialogHeader>

        {/* Show error message if user is not logged in */}
        {error && (
          <div className="text-red-600 text-center mt-4">
            {error}
          </div>
        )}

        {/* Step 1: Enter Price */}
        {step === 1 && user && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
        )}

        {/* Step 2: Confirm Price and Show QR Code */}
        {step === 2 && (
          <div className="py-4">
            <p className="text-center text-lg">You have entered ${price}</p>

            {/* Show QR Code if available */}
            {qrCodeValue && (
              <div className="mt-4 text-center">
                <QRCode value={qrCodeValue} size={128} level="H" renderAs="canvas" />
                <div className="mt-2">
                  <a
                    href={qrCodeValue}
                    download={`qr_code_${price}.png`}
                    className="text-blue-600 cursor-pointer"
                  >
                    Download QR Code
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          {/* Step 1: Show "Next" button */}
          {step === 1 && user && (
            <Button onClick={handleNext} disabled={!price}>
              Next
            </Button>
          )}

          {/* Step 2: Show "Save" and "Cancel" buttons */}
          {step === 2 && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={loading}> {/* Disable button when loading */}
                {loading ? "Saving..." : "Save"} {/* Show loading text when saving */}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

