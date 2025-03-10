import { useEffect, useState } from 'react';
import CompleteMe, { OptionsInterface } from '../../components/complete-me';
import Button from '../../components/ui/buttons/button';
import AddIcon from '@mui/icons-material/Add';
import Dropdown from '../../components/ui/dropdown';

import 'rsuite/dist/rsuite-no-reset.min.css';

import { useCreateCompanyMutation, useGetCompaniesQuery } from '../../store/services/company';
import AddCompanyModal from './components/AddCompanyModal';
import ListCompanies from './components/ListCompanies';

const Home = () => {
  const [openAutoComp, setOpenAutoComp] = useState(false);
  const [autoCompOptions, setAutoCompOptions] = useState<OptionsInterface[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
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
        <ListCompanies companies={companies?.data?.data} />
      </div>
      {/*//? Modal ============================================================ */}
      <AddCompanyModal
        openModal={openModal}
        handleModalClose={handleModalClose}
        dateValue={dateValue}
        setDateValue={setDateValue}
        companyName={companyName}
        setCompanyName={setCompanyName}
        location={location}
        setLocation={setLocation}
        state={state}
        setState={setState}
        onSubmit={onSubmit}
        companyLoading={companyLoading}
      />
    </>
  );
};

export default Home;
