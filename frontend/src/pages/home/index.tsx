import { useEffect, useState } from 'react';
import CompleteMe, { OptionsInterface } from '../../components/complete-me';
import Button from '../../components/ui/buttons/button';
import AddIcon from '@mui/icons-material/Add';
import Dropdown from '../../components/ui/dropdown';
import { Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import Input from '../../components/ui/inputs/input';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useCreateCompanyMutation, useGetCompaniesQuery } from '../../store/services/company';

const Home = () => {
  const [openAutoComp, setOpenAutoComp] = useState(false);
  const [autoCompOptions, setAutoCompOptions] = useState<OptionsInterface[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [dateValue, setDateValue] = useState<Date | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [state, setState] = useState('');
  const [searchValue, setSearchValue] = useState<OptionsInterface | null>(null);
  const [inputValue, setInputValue] = useState('');

  // APIS
  const [createCompany, { isLoading: companyLoading }] = useCreateCompanyMutation();
  const // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { data: companies, isLoading: companiesLoading } = useGetCompaniesQuery({
      state: inputValue,
      page: 1,
      limit: 10
    });

  useEffect(() => {
    document.title = 'Home';
    setDateValue(new Date());
  }, []);

  useEffect(() => {
    console.log('Companies:', companies?.data?.data);
    setAutoCompOptions(() => {
      return (
        companies?.data?.data?.map((company: any) => ({
          state: company.state
        })) || []
      );
    });
  }, [companies]);

  const onSubmit = async () => {
    console.log('Company Name:', companyName);
    console.log('State:', state);
    console.log('Location:', location);
    console.log('Founded on:', dateValue);

    await createCompany({
      companyName,
      state,
      location,
      foundedOn: dateValue?.toISOString()
    });

    setCompanyName('');
    setState('');
    setLocation('');
    setDateValue(new Date());
    handleModalClose();
  };

  const handleOpenAutoComp = () => {
    setOpenAutoComp(true);
  };

  const handleCloseAutoComp = () => {
    setOpenAutoComp(false);
  };

  const handleModalClose = () => setOpenModal(false);

  return (
    <>
      <div>
        {/*//$ Header ============================================================ */}
        <div className="flex justify-between items-end bg-gray">
          {/*//* Group 1 ============================================================ */}
          <div className="flex gap-2 items-end h-full">
            {/*//* Select City - Auto-Complete ============================================================ */}
            <div className="flex-col gap-2 h-full">
              <label className="mb-2 text-gray-500">Select City</label>
              <CompleteMe
                open={openAutoComp}
                handleOpen={handleOpenAutoComp}
                handleClose={handleCloseAutoComp}
                options={autoCompOptions}
                loading={companiesLoading}
                value={searchValue}
                setValue={(value) => {
                  console.log('Selected value:', value);
                  setSearchValue(value);
                }}
                inputValue={inputValue}
                setInputValue={(value) => {
                  console.log('Input value:', value);
                  setInputValue(value);
                }}
              />
            </div>
            {/*//* Find Company - Button ============================================================ */}
            <div>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => {
                  console.log('Button clicked');
                  console.log('Current search value:', searchValue?.state || inputValue);
                }}>
                Find Company
              </Button>
            </div>
          </div>
          {/*//* Group 2 ============================================================ */}
          <div>
            {/*//* Add Company - Button ============================================================ */}
            <Button
              type="button"
              variant="primary"
              size="md"
              leftIcon={<AddIcon fontSize={'small'} />}
              onClick={() => {
                setOpenModal(true);
              }}>
              Add Company
            </Button>
          </div>
          {/*//* Group 3 ============================================================ */}
          <div>
            <label className="text-gray-500">Sort:</label>
            <Dropdown
              options={['Title', 'Year']}
              placeholder="Select an option"
              onChange={(value) => {
                console.log(value);
              }}
            />
          </div>
        </div>

        <hr className="mt-8 text-gray-200" />

        {/*//$ Body ============================================================ */}
        {/*//* Companies ============================================================ */}
        <div>
          {companies?.data?.data?.map((company: any) => (
            <div key={company._id} className="flex gap-4 mt-4 bg-white p-4 rounded-md shadow-md">
              <div>
                <img
                  src="https://www.gravatar.com/avatar/"
                  alt="company-logo"
                  className="h-16 w-16 rounded-full"
                />
              </div>
              <div className="flex-col grow gap-4">
                <div className="flex justify-between items-center w-full">
                  <h1 className="text-lg">Company: {company.name}</h1>
                  {/* <p className="text-gray-500">{company.location}</p> */}
                  <p className="text-gray-500 text-xs">
                    Founded on: {new Date(company.foundedOn).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">{company.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/*//? Modal ============================================================ */}
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

export default Home;
