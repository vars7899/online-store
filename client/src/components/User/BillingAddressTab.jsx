import React from "react";
import * as Components from "../";
import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";

export const BillingAddressTab = () => {
  return (
    <form className="p-4">
      <Components.Default.SettingsPairContainer
        title={"Personal details"}
        desc={"Please take a moment to update and make any necessary changes to your billing address within the system"}
      >
        <div>
          <FormControl isRequired mt={4}>
            <FormLabel>Street</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Address Line</FormLabel>
            <Textarea />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>City</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Country</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Postal Code</FormLabel>
            <Input type="text" />
          </FormControl>
        </div>
      </Components.Default.SettingsPairContainer>
    </form>
  );
};
