import { useEffect } from 'react';
import useEducationStore from '@/store/educationStore';

import { Card, CardContent } from '@mui/material';

import PreviewForm from './PreviewForm';

const OrderPreview = ({ status }: { status: 'pending' | 'completed' | 'processing' }) => {
  const { preview, clearPreview } = useEducationStore();
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
                </div>
              </div>

              <div className="mt-6 space-y-4 font-medium text-xs">
                <div className="flex">
                  <a
                    target="_blank"
                    className="block p-2 border rounded-md bg-[#707070] text-white"
                    href={preview?.certImage ?? ''}
                    rel="noreferrer"
                  >
                    View Document
                  </a>
                </div>
                {status !== 'completed' && <PreviewForm />}
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
