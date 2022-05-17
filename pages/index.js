import Layout from '../components/Layout';
// import TextComponent from '../components/TextComponent';
import {
  Button,
  Grid,
  GridItem,
  Select,
  Textarea,
  Text,
  Flex,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Popover,
  PopoverArrow,
  PopoverTrigger,
  Portal,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
} from '@chakra-ui/react';
import Mark from 'mark.js';
import React, {
  Component,
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const baseURL = 'http://localhost:5000';

export default function Home() {
  const [text, setText] = useState('');
  const [option, setOption] = useState('');
  // const [wrongWords, setWrongWords] = useState([]);
  const [displayedText, setDisplayedText] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const scrollToItem = (item, inline) => {
    item.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: inline,
    });
  };

  function markText(textsToMark, options) {
    const markInstance = new Mark(document.querySelector('.result-text'));
    // markInstance.unmark({
    //   done: () => {
    markInstance.mark(textsToMark, options);
    //   },
    // });
  }

  function unmarkText(textToUnmark) {
    const markInstance = new Mark(document.querySelector('.result-text'));
    markInstance.unmark({ element: textToUnmark });
  }

  const resultRef = useRef(null);
  // const scrollToText = () => {
  //   resultRef.current.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'nearest',
  //     inline: 'center',
  //   });
  // };

  const textAreaRef = useRef(null);
  // const scrollToTextArea = () => {};

  const fetchEvents = async () => {
    const data = await axios.get(`${baseURL}`);
    console.log('DATA:', data);
  };

  const onSubmit = async (e) => {
    // e.preventDefault();
    console.log('Text:', text);
    console.log('Option:', option);
    setDisplayedText(text);
    switch (option) {
      // case 'tokenizer':
      //   const data = await axios.post(`${baseURL}/tokenizer`, { text });
      //   console.log(data.data);
      //   setWrongWords(data.data);
      //   break;
      // case 'ner':
      //   const dataNER = await axios.post(`${baseURL}/ner`, { text });
      //   console.log(dataNER.data);
      //   break;
      case 'sentiment':
        const dataSentiment = await axios.post(`${baseURL}/sentiment`, {
          text,
        });
        console.log(dataSentiment.data);
        setDisplayedText(
          `Your text feels like ${dataSentiment.data.sentiment}`
        );
        break;
      case 'error':
        const dataErr = await axios.post(`${baseURL}/error`, { text });
        console.log(dataErr.data);
        let errorList = [];
        for (var key in dataErr.data) {
          errorList.push(key);
        }
        if (errorList.length > 0) {
          const markOptions = {
            element: 'select',
            className: 'highlighted',
            accuracy: {
              value: 'exactly',
              limiters: [',', '.'],
            },
            each: () => {},
          };
          console.log(errorList);
          markText(errorList, markOptions);
          const markedElements = document.getElementsByClassName('highlighted');
          for (var i = 0; i < errorList.length; ++i) {
            let suggestionsList = [];
            for (var suggKey in dataErr.data[errorList[i]].suggestions) {
              suggestionsList.push(suggKey);
            }
            markedElements[i].value = errorList[i];
            suggestionsList.map((elm) => {
              var opt = document.createElement('option');
              opt.innerHTML = elm;
              opt.value = elm;
              markedElements[i].appendChild(opt);
            });
            // markedElements[i].addEventListener('change', (e) => {
            //   e.preventDefault();
            //   // this.innerHTML = e.target.value;
            //   unmarkText(this);
            // });
          }

          // console.log(markedElements);
        }

        break;
      default:
        console.log('Text: ', text);
    }
    scrollToItem(resultRef, 'center');
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };

  const handleReset = () => {
    setText('');
    setDisplayedText('');
    scrollToItem(textAreaRef, 'start');
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  // markText('غبي');
  return (
    <Layout>
      <Flex direction={'column'} mx={[0, 0, 0, '20px', '20px']}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            // h="400px"
            templateRows={[
              'repeat(11, 1fr)',
              'repeat(11, 1fr)',
              'repeat(11, 1fr)',
              'repeat(9, 1fr)',
              'repeat(9, 1fr)',
            ]}
            templateColumns="repeat(9, 1fr)"
            rowGap={[6, 6, 6, 2, 2]}
            columnGap={[0, 0, 0, 4, 4]}
            my="20px"
          >
            <GridItem
              height={['initial', 'initial', 'initial', '400px', '400px']}
              rowSpan={[8, 8, 8, 5, 5]}
              colSpan={[9, 9, 9, 6, 6]}
            >
              <FormControl isRequired height="90%" isInvalid={errors.text}>
                <FormLabel ref={textAreaRef} htmlFor="text">
                  1 - Type your text here
                </FormLabel>
                <Textarea
                  id="text"
                  {...register('text', {
                    required: 'Text is required',
                    pattern: /^[\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufc3f]|[\ufe70-\ufefc]+$/,
                  })}
                  w="100%"
                  h="100%"
                  size="sm"
                  placeholder="اكتب نصا بالعربية..."
                  //   maxLength={500}
                  resize="none"
                  dir="rtl"
                  mt="5px"
                  value={text}
                  onChange={handleTextChange}
                ></Textarea>
                {errors.text && (
                  <FormErrorMessage>
                    {errors.text.type === 'pattern'
                      ? 'Only Arabic characters and numbers are allowed'
                      : 'Text is required'}
                  </FormErrorMessage>
                )}
              </FormControl>
            </GridItem>
            <GridItem colSpan={[9, 9, 9, 3, 3]} rowSpan={1}>
              <FormControl isRequired isInvalid={errors.select}>
                <FormLabel htmlFor="select">
                  2 - Choose what do you want to do with your text
                </FormLabel>
                <Select
                  id="select"
                  {...register('select', { required: 'Select an option' })}
                  bgColor="#fff"
                  color="#812990"
                  placeholder="Select what you want to do with the text"
                  mt="5px"
                  value={option}
                  onChange={handleOptionChange}
                >
                  <option value="tokenizer">Tokenize Text</option>
                  <option value="ner">Entity Recognizer</option>
                  <option value="sentiment">Sentiment Analysis</option>
                  <option value="error">Error Detection</option>
                </Select>
                {errors.select && (
                  <FormErrorMessage>{errors.select.message}</FormErrorMessage>
                )}
              </FormControl>
            </GridItem>
            <GridItem colSpan={[9, 9, 9, 3, 3]} rowSpan={1}>
              <FormControl>
                <FormLabel>3 - Get Your Results</FormLabel>
                <Button
                  id="submit"
                  isLoading={isSubmitting}
                  color="#fff"
                  w="200px"
                  bgColor="#812990"
                  borderRadius="50px"
                  type="submit"
                >
                  Analyse
                </Button>
              </FormControl>
            </GridItem>
            <GridItem colSpan={[9, 9, 9, 3, 3]} rowSpan={1}>
              <FormControl>
                <FormLabel>Erase Text</FormLabel>
                <Button type="reset" onClick={handleReset}>
                  Reset
                </Button>
              </FormControl>
            </GridItem>
          </Grid>
        </form>
        <Grid>
          <GridItem ref={resultRef} mx={[0, 0, 0, '100px', '100px']}>
            {/* <TextComponent
              text={displayedText}
              // wrongWords={wrongWords}
            /> */}
            <Text
              dir={option === 'error' ? 'rtl' : 'ltr'}
              className="result-text"
              ref={resultRef}
            >
              {displayedText}
            </Text>
          </GridItem>
        </Grid>
      </Flex>
    </Layout>
  );
}
