// apiService.jsx
import axios from 'axios';

const BASE_URL = 'https://api.example.com'; // Your API base URL



// await axios.get('http://13.59.144.105:9003/upload')
// Function to make a GET request
export const getGraphData = async (inputData) => {
  //return axios.post('http://13.59.144.105:9004/ner_re_graph')
  //return axios.post('http://13.59.144.105:9004/multiple_graph', inputData)
  return axios.get('assets/graph.json')
    .then(response => {
      // Return data from the API call
      return response.data;
    })
    .catch(error => {
      // Handle error
      console.error('Error fetching data:', error);
    });
};

// http://13.59.144.105:9004/get_re
// 'assets/graphHome.json'http://13.59.144.105:9004/document_graph
export const getGraphDocData = async () => {
  return axios.get('assets/graphHome.json')
    //return axios.get('http://13.59.144.105:9004/document_graph')
    .then(response => {
      // Return data from the API call
      return response.data;
    })
    .catch(error => {
      // Handle error
      console.error('Error fetching data:', error);
    });
};
export const getStudiesLocal = async () => {
  //return axios.get('http://13.59.144.105:9003/return_studylist/')
  return axios.get('assets/study.json')
    .then(response => {
      // Return data from the API call
      return response.data;
    })
    .catch(error => {
      // Handle error
      console.error('Error fetching data:', error);
    });
};

export const getStudyType = async () => {
  return axios.get('assets/studytype.json')
    //return axios.get('http://13.59.144.105:9003/return_study_type/')
    .then(response => {
      // Return data from the API call
      return response.data;
    })
    .catch(error => {
      // Handle error
      console.error('Error fetching data:', error);
    });
};
export const getStudyDetails = async (id) => {
  return axios.get('assets/studyDetails.json')
    //return axios.get(`http://13.59.144.105:9003/return_study_details/?nct_id=${id}`)
    .then(response => {
      // Return data from the API call
      return response.data;
    })
    .catch(error => {
      // Handle error
      console.error('Error fetching data:', error);
    });
};
export const getResultDetails = async (data) => {
  return axios.post('assets/resultData.json')
    //return axios.get(`http://13.59.144.105:9003/return_study_details/?nct_id=${id}`)
    .then(response => {
      // Return data from the API call
      return response.data;
    })
    .catch(error => {
      // Handle error
      console.error('Error fetching data:', error);
    });
};
export const getGraphDataLocal = async () => {
  return axios.get('assets/graph.json')
    .then(response => {
      // Return data from the API call
      return response.data;
    })
    .catch(error => {
      // Handle error
      console.error('Error fetching data:', error);
    });
};

export const getGraphDataLocalNew = async () => {
  return axios.get('assets/graphN.json')
    .then(response => {
      // Return data from the API call
      return response.data;
    })
    .catch(error => {
      // Handle error
      console.error('Error fetching data:', error);
    });
};

export const fileUpload = async (formData) => {
  return axios.post('http://13.59.144.105:9004/upload_pdf_to_s3/', formData).then((response) => {
    console.log('Upload successful:', response);
    // Handle response as needed
  }).catch((error) => {
    console.error('Upload failed:', error);
    // Handle error as needed
  });
};


export const getPdfData = async () => {
  return process.env.PUBLIC_URL + 'assets/20240223_1521241.pdf';
  // return axios.get('assets/20240223_1521241.pdf')
  //   .then(response => {
  //     // Return data from the API call
  //     return response.data;
  //   })
  //   .catch(error => {
  //     // Handle error
  //     console.error('Error fetching data:', error);
  //   });
};

export const fetchFilterData = async () => {
  return axios.get('assets/filter.json')
    .then(response => {
      // Return data from the API call
      return response.data;
    })
    .catch(error => {
      // Handle error
      console.error('Error fetching data:', error);
    });
};

export const postGraphData = async (payload) => {
  try {
    const response = await axios.post(`${Content_BASE_URL}/process-query/`, payload);
    return response.data.response;
  } catch (error) {
    throw error;
  }
};
const Content_BASE_URL = 'http://184.105.215.91:8000';

export const postContentData = async (payload) => {
  try {
    const response = await axios.post(`${Content_BASE_URL}/process-query/`, payload);
    return response.data.response;
  } catch (error) {
    throw error;
  }
};
// Function to make a POST request
export const createExampleData = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/example`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}