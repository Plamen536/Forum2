import { Checkbox } from '@chakra-ui/react';

const AestheticTagsView = () => {
  return (
    <>
      <Checkbox id="wrapping" color="white">
        wrapping
      </Checkbox>
      <Checkbox id="interior" color="white">
        interior
      </Checkbox>
      <Checkbox id="wheels" color="white">
        wheels
      </Checkbox>
      <Checkbox id="headlights" color="white">
        headlights
      </Checkbox>
      <Checkbox id="audio" color="white">
        audio
      </Checkbox>
    </>
  );
};
export default AestheticTagsView;
