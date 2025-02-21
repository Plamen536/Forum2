import { Checkbox } from '@chakra-ui/react';

const FuelTagsView = () => {
  return (
    <>
      <Checkbox id="gasoline" color="white">
        gasoline
      </Checkbox>
      <Checkbox id="diesel" color="white">
        diesel
      </Checkbox>
      <Checkbox id="lpg" color="white">
        lpg
      </Checkbox>
      <Checkbox id="electric" color="white">
        electric
      </Checkbox>
      <Checkbox id="hybrid" color="white">
        hybrid
      </Checkbox>
      <Checkbox id="fuel_consumption" color="white">
        fuel consumption
      </Checkbox>
    </>
  );
};
export default FuelTagsView;
