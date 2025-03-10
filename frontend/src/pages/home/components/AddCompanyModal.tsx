import { Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from 'rsuite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Input from '../../../components/ui/inputs/input';
import Button from '../../../components/ui/buttons/button';
import { FC } from 'react';

interface AddCompanyModalProps {
  openModal: boolean;
  handleModalClose: () => void;
  dateValue: Date | null;
  setDateValue: (value: Date | null) => void;
  companyName: string;
  setCompanyName: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  state: string;
  setState: (value: string) => void;
  onSubmit: () => void;
  companyLoading: boolean;
}

const AddCompanyModal: FC<AddCompanyModalProps> = ({
  openModal,
  handleModalClose,
  dateValue,
  setDateValue,
  companyName,
  setCompanyName,
  location,
  setLocation,
  state,
  setState,
  onSubmit,
  companyLoading
}) => {
  return (
    <>
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div
          className="h-[65vh] w-[300px] p-4 pt-6 bg-white relative"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            borderRadius: '18px',
            height: 'contents'
          }}>
          <div
            onClick={handleModalClose}
            className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700">
            <CloseIcon
              fontSize="small"
              sx={{
                color: 'gray'
              }}
            />
          </div>
          <h1 className="text-2xl text-center">Add Company</h1>
          <form
            className="flex-col gap-8 justify-between items-center mt-8 h-full w-full"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}>
            {/*//* Company Name ============================================================ */}
            <div className=" h-[19%] flex-col gap-4">
              <label className="text-gray-400 text-sm">Company Name:</label>
              <div className="mt-2">
                <Input
                  required={true}
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(value) => {
                    setCompanyName(value);
                  }}
                />
              </div>
            </div>
            {/*//* State ============================================================ */}
            <div className=" h-[19%] flex-col gap-4">
              <label className="text-gray-400 text-sm">State:</label>
              <div className="mt-2">
                <Input
                  required={true}
                  placeholder="State"
                  value={state}
                  onChange={(value) => {
                    setState(value);
                  }}
                />
              </div>
            </div>
            {/*//* Location ============================================================ */}
            <div className="h-[19%]">
              <label className="text-gray-400 text-sm">Location:</label>
              <div className="mt-2">
                <Input
                  required={true}
                  placeholder="Location"
                  value={location}
                  onChange={(value) => {
                    setLocation(value);
                  }}
                  icon={<LocationOnIcon sx={{ color: 'gray' }} />}
                />
              </div>
            </div>
            {/*//* Founded on ============================================================ */}
            <div className="h-[19%]">
              <label className="text-gray-400 text-sm">Founded on:</label>
              <div className="mt-2">
                <DatePicker
                  placement="topEnd"
                  style={{ width: '100%' }}
                  value={dateValue}
                  onChange={(value: Date | null) => {
                    console.log(value);
                    setDateValue(value);
                  }}
                />
              </div>
            </div>
            <div className="h-[19%] flex justify-center">
              <Button
                type="submit"
                variant="primary"
                size="md"
                onClick={(e) => {
                  e.preventDefault();
                  if (!companyName || !state || !location || !dateValue) {
                    return;
                  }
                  onSubmit();
                }}
                isLoading={companyLoading}>
                Add Company
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddCompanyModal;
