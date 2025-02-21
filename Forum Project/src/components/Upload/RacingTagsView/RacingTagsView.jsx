import { Checkbox } from '@chakra-ui/react';

const RacingTagsView = () => {
  return (
    <>
      <Checkbox id="drag" color="white">
        drag
      </Checkbox>
      <Checkbox id="drift" color="white">
        drift
      </Checkbox>
      <Checkbox id="rally" color="white">
        rally
      </Checkbox>
      <Checkbox id="offroad" color="white">
        offroad
      </Checkbox>
      <Checkbox id="track" color="white">
        track
      </Checkbox>
    </>
  );
};
export default RacingTagsView;
