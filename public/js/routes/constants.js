// Get the current URL pathname
const pathname = window.location.pathname;

// Split the pathname by slashes to get the individual segments
const segments = pathname.split('/');

// Get the parent directory name (second to last segment)
// const parentDirectoryName = segments[segments.length - 1];

const parentDIRName = segments[1];
const domainName = window.location.origin
let parentDirectoryName, EndPoint, submissionsEndpoint, domainN
if(parentDIRName === "asfirj_admin"){   
    parentDirectoryName = `/asfirj_admin`
    EndPoint = `/asfirj_admin/backend`;
    submissionsEndpoint = 'http://localhost/asfirj_submission_controls'
    domainN = "http://localhost/asfi_journal"

}else{
    parentDirectoryName = ""
    EndPoint = '/backend'   
    submissionsEndpoint = 'https://cp.asfirj.org'
    domainN = "https://asfirj.org"
}

function GetParameters(href){
    // Get the URL string
    const urlString = href;
    
    // Create a URL object
    const url = new URL(urlString);
    
    // Get the search parameters from the URL
    const searchParams = new URLSearchParams(url.search);
    return searchParams
    
    }

// console.log(parentDirectoryName)
// Concatenate with the desired directory name


// Get the URL string
const urlString = window.location.href;

// Create a URL object
const url = new URL(urlString);

// Get the search parameters from the URL
const searchParams = new URLSearchParams(url.search);

// Get the value of the "man" parameter


export { 
    EndPoint,
    parentDirectoryName, 
    domainName,
    searchParams,
    GetParameters,
    submissionsEndpoint,
    url,
    domainN
};
 