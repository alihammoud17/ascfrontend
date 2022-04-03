import Layout from '../components/layout';
import { Button, Grid, GridItem, Select, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react';

const baseURL = 'http://127.0.0.1:5000/';

export default function Home() {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <Grid
          h="400px"
          templateRows={[
            'repeat(12, 1fr)',
            'repeat(12, 1fr)',
            'repeat(12, 1fr)',
            'repeat(4, 1fr)',
            'repeat(4, 1fr)',
          ]}
          templateColumns="repeat(9, 1fr)"
          gap={[9, 9, 9, 4, 4]}
        >
          <GridItem rowSpan={[8, 8, 8, 4, 4]} colSpan={[9, 9, 9, 6, 6]}>
            <label>1 - Type your text here</label>
            <Textarea
              w="100%"
              h="100%"
              size="sm"
              placeholder="اكتب نصا بالعربية..."
              maxLength={500}
              resize="none"
              dir="rtl"
              mt="5px"
              value={text}
              onChange={handleChange}
            ></Textarea>
          </GridItem>
          <GridItem colSpan={[9, 9, 9, 3, 3]} rowSpan={2}>
            <label>2 - Choose what do you want to do with your text</label>
            <Select
              color="#fff"
              bgColor="#812990"
              placeholder="Select what you want to do with the text"
              mt="5px"
            ></Select>
          </GridItem>
          <GridItem colSpan={[9, 9, 9, 3, 3]} rowSpan={2}>
            <label>3 - Get Your Results</label>{' '}
            <Button
              color="#fff"
              w="200px"
              bgColor="#812990"
              borderRadius="50px"
              type="submit"
            >
              Analyse
            </Button>
          </GridItem>
          {/* <GridItem colSpan={3} rowSpan={1}></GridItem> */}
        </Grid>
      </form>
    </Layout>
  );
}
