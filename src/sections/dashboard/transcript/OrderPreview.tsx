import React, { useEffect } from 'react';
import useTranscriptStore from '@/store/transcriptStore';

import { Card, CardContent } from '@mui/material';

import PreviewForm from './PreviewForm';

const OrderPreview = ({
  status = 'pending',
}: {
  status: 'pending' | 'completed' | 'processing';
}) => {
  const { preview, clearPreview } = useTranscriptStore();
  useEffect(() => () => clearPreview(), [clearPreview]);

  return (
    <div className="lg:min-w-[470px]">
      <h2 className="text-xl font-semibold mb-4">Details</h2>
      <Card>
        <CardContent className="min-h-[400px]">
          {preview ? (
            <>
              <div className="text-[#707070]">
                <h3 className="my-[0.83em] text-2xl font-bold">Individual Details</h3>
                <hr className="mb-3" />
                <div className="grid grid-cols-2 gap-8 font-medium text-xs">
                  <div>
                    <span>First Name:</span>
                    <span>{preview?.firstName ?? ''}</span>
                  </div>

                  <div>
                    <span>Last Name:</span>
                    <span>{preview?.lastName ?? ''}</span>
                  </div>

                  <div>
                    <span>Matric Number:</span>
                    <span>{preview?.matricNo ?? ''}</span>
                  </div>

                  <div>
                    <span>Course:</span>
                    <span>{preview?.course ?? ''}</span>
                  </div>

                  <div>
                    <span>Grad Year:</span>
                    <span>{preview?.graduationYear ?? ''}</span>
                  </div>

                  <div>
                    <span>Request Id:</span>
                    <span>{preview?.id ?? ''}</span>
                  </div>
                </div>
              </div>
              <div className="text-[#707070]">
                <h3 className="my-[0.83em] text-2xl font-bold">Destination Details</h3>
                <hr className="mb-3" />
                <div className="grid gap-8 font-medium text-xs mb-6">
                  <div>
                    <span>Destination Country: </span>
                    <span>{preview?.destination ?? ''}</span>
                  </div>
                  <div>
                    <span>Address Line:</span>
                    <span>{preview?.address ?? ''}</span>
                  </div>
                  <div className="flex gap-6 ">
                    <div>
                      <span>Zip/Postcode: </span>
                      <span>{preview?.zipCode ?? ''}</span>
                    </div>
                    <div>
                      <span>Destination No: </span>
                      <span>{preview?.destinationNumber ?? ''}</span>
                    </div>
                    <div>
                      <span>City:</span>
                      <span>{preview?.city ?? ''}</span>
                    </div>
                    <div />
                  </div>
                  {status !== 'pending' && (
                    <div>
                      <span>Updated By:</span>
                      <span>{preview?.updatedBy ?? ''}</span>
                    </div>
                  )}
                </div>
                {status !== 'completed' && (
                  <div>
                    <PreviewForm />
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="grid place-items-center size-full min-h-[450px]">
              <p className="text-center tracking-[0.28px] opacity-20  text-[#707070] max-w-[55%] text-lg">
                Please select an order to view details
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderPreview;
