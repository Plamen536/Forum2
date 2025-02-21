import { Checkbox } from '@chakra-ui/react';

const LawTagsView = () => {
  return (
    <>
      <Checkbox id="imported_cars" color="white">
        imported cars
      </Checkbox>
      <Checkbox id="insurance" color="white">
        insurance
      </Checkbox>
      <Checkbox id="theft" color="white">
        theft
      </Checkbox>
      <Checkbox id="registration" color="white">
        registration
      </Checkbox>
      <Checkbox id="toll" color="white">
        toll
      </Checkbox>
    </>
  );
};
export default LawTagsView;
