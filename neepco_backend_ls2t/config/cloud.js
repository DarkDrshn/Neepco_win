import pkg from 'aws-sdk';
const { config, S3 } = pkg;
import { createWriteStream } from 'fs';
// Configure AWS with your credentials


export const test2 = () => {
    
    console.log(gem_prc_transfer("https://gemcloud.s3.amazonaws.com/gemfile+(5).pdf",15))
    console.log(gem_crac_transfer("https://gemcloud.s3.amazonaws.com/gemfile+(6).pdf",16))
    console.log(gem_pao_transfer("https://gemcloud.s3.amazonaws.com/gemfile+(7).pdf",17))
    console.log(cpp_prc_transfer("https://gemcloud.s3.amazonaws.com/cppfile+(5).pdf",86))
    console.log(cpp_crac_transfer("https://gemcloud.s3.amazonaws.com/cppfile+(6).pdf",85))
    console.log(cpp_pao_transfer("https://gemcloud.s3.amazonaws.com/cppfile+(7).pdf",84))
    // config.update({
    //     accessKeyId: 'AKIAZEMCE2BOBU4RDIUD',
    //     secretAccessKey: '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',
    //     // Other optional configurations**********************************
    // });
    // const s3 = new S3();
    // var params = {
    //     Bucket: "neepcocloud",//"destinationbucket", 
    //     CopySource: "gemcloud/procurementformfilling.txt",//"/sourcebucket/sourceKeyName", 
    //     Key: "hello.txt"
    // };
    // s3.copyObject(params, function(err, data) {
    //     if (err) console.log(err, err.stack); // an error occurred
    //     else     console.log(data);           // successful response
    // });

}

async function transferFile(sourceBucket, sourceKey, destinationBucket, destinationKey) {
    const copyParams = {
      Bucket: destinationBucket,
      CopySource: `/${sourceBucket}/${sourceKey}`,
      Key: destinationKey,
    };
    
  
    try {
        await S3.copyObject(copyParams).promise();
        console.log(`File copied from ${sourceBucket}/${sourceKey} to ${destinationBucket}/${destinationKey}`);
    } catch (error) {
        console.error('Error copying file:', error);
    }
}

export const testcloud = () =>{
    config.update({
        accessKeyId: 'AKIAZEMCE2BOBU4RDIUD',
        secretAccessKey: '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',
        // Other optional configurations
    });
      
    // Create an S3 instance
    const s3 = new S3();
    
    const bucketName = 'gemcloud';
    const key = 'procurementformfilling.txt'; // Replace this with your file path in the bucket
    const localFilePath = './cloudTempStorage'; // Replace this with the local path where you want to save the file
    
    const downloadParams = {
        Bucket: bucketName,
        Key: key,
    };
    
    const file = createWriteStream(localFilePath);
    
    s3.getObject(downloadParams)
        .createReadStream()
        .on('error', function(err) {
            console.error('Error downloading file:', err);
        })
        .on('end', function() {
            console.log('File downloaded successfully');
        })
        .pipe(file);

        const sourceBucket = 'gemcloud';
        const sourceKey = 'procurementformfilling.txt';
        const destinationBucket = 'neepcocloud';
        const destinationKey = 'procurementformfilling.txt';
        
        transferFile(sourceBucket, sourceKey, destinationBucket, destinationKey);
      
      
}


function gem_prc_transfer(prc_path, procure_id) {
    const sourceBucket="gemcloud", sourceKey=prc_path.split('/').pop(), destinationBucket="neepcocloud", destinationKey=`${procure_id}+prc.pdf`;
    const params = {
      Bucket: destinationBucket,
      CopySource: `/${sourceBucket}/${sourceKey}`,
      Key: destinationKey,
    };
    config.update({
        accessKeyId: 'AKIAZEMCE2BOBU4RDIUD',
        secretAccessKey: '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',
        // Other optional configurations
    });
    const s3 = new S3();
  
    try {
         s3.copyObject(params).promise();
        console.log(`File copied from ${sourceBucket}/${sourceKey} to ${destinationBucket}/${destinationKey}`);
    } catch (error) {
        console.error('Error copying file:', error);
    }

    return `https://neepcocloud.s3.amazonaws.com/${procure_id}%2Bprc.pdf`;
}

function gem_crac_transfer(crac_path, procure_id) {
    const sourceBucket="gemcloud", sourceKey=crac_path.split('/').pop(), destinationBucket="neepcocloud", destinationKey=`${procure_id}+crac.pdf`;
    const params = {
      Bucket: destinationBucket,
      CopySource: `/${sourceBucket}/${sourceKey}`,
      Key: destinationKey,
    };
    config.update({
        accessKeyId: 'AKIAZEMCE2BOBU4RDIUD',
        secretAccessKey: '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',
        // Other optional configurations
    });
    const s3 = new S3();
  
    try {
         s3.copyObject(params).promise();
        console.log(`File copied from ${sourceBucket}/${sourceKey} to ${destinationBucket}/${destinationKey}`);
    } catch (error) {
        console.error('Error copying file:', error);
    }
    
    return `https://neepcocloud.s3.amazonaws.com/${procure_id}%2Bcrac.pdf`;
}

 function gem_pao_transfer(crac_path, procure_id) {
    const sourceBucket="gemcloud", sourceKey=crac_path.split('/').pop(), destinationBucket="neepcocloud", destinationKey=`${procure_id}+pao.pdf`;
    const params = {
      Bucket: destinationBucket,
      CopySource: `/${sourceBucket}/${sourceKey}`,
      Key: destinationKey,
    };
    config.update({
        accessKeyId: 'AKIAZEMCE2BOBU4RDIUD',
        secretAccessKey: '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',
        // Other optional configurations
    });
    const s3 = new S3();
  
    try {
         s3.copyObject(params).promise();
        console.log(`File copied from ${sourceBucket}/${sourceKey} to ${destinationBucket}/${destinationKey}`);
    } catch (error) {
        console.error('Error copying file:', error);
    }
    
    return `https://neepcocloud.s3.amazonaws.com/${procure_id}%2Bpao.pdf`;
}


 function cpp_prc_transfer(prc_path, procure_id) {
    const sourceBucket="cppcloud", sourceKey=prc_path.split('/').pop(), destinationBucket="neepcocloud", destinationKey=`${procure_id}+prc.pdf`;
    const params = {
      Bucket: destinationBucket,
      CopySource: `/${sourceBucket}/${sourceKey}`,
      Key: destinationKey,
    };
    config.update({
        accessKeyId: 'AKIAZEMCE2BOBU4RDIUD',
        secretAccessKey: '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',
        // Other optional configurations
    });
    const s3 = new S3();
  
    try {
         s3.copyObject(params).promise();
        console.log(`File copied from ${sourceBucket}/${sourceKey} to ${destinationBucket}/${destinationKey}`);
    } catch (error) {
        console.error('Error copying file:', error);
    }

    return `https://neepcocloud.s3.amazonaws.com/${procure_id}%2Bprc.pdf`;
}

 function cpp_crac_transfer(crac_path, procure_id) {
    const sourceBucket="cppcloud", sourceKey=crac_path.split('/').pop(), destinationBucket="neepcocloud", destinationKey=`${procure_id}+crac.pdf`;
    const params = {
      Bucket: destinationBucket,
      CopySource: `/${sourceBucket}/${sourceKey}`,
      Key: destinationKey,
    };
    config.update({
        accessKeyId: 'AKIAZEMCE2BOBU4RDIUD',
        secretAccessKey: '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',
        // Other optional configurations
    });
    const s3 = new S3();
  
    try {
         s3.copyObject(params).promise();
        console.log(`File copied from ${sourceBucket}/${sourceKey} to ${destinationBucket}/${destinationKey}`);
    } catch (error) {
        console.error('Error copying file:', error);
    }
    
    return `https://neepcocloud.s3.amazonaws.com/${procure_id}%2Bcrac.pdf`;
}

 function cpp_pao_transfer(crac_path, procure_id) {
    const sourceBucket="cppcloud", sourceKey=crac_path.split('/').pop(), destinationBucket="neepcocloud", destinationKey=`${procure_id}+pao.pdf`;
    const params = {
      Bucket: destinationBucket,
      CopySource: `/${sourceBucket}/${sourceKey}`,
      Key: destinationKey,
    };
    config.update({
        accessKeyId: 'AKIAZEMCE2BOBU4RDIUD',
        secretAccessKey: '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',
        // Other optional configurations
    });
    const s3 = new S3();
  
    try {
         s3.copyObject(params).promise();
        console.log(`File copied from ${sourceBucket}/${sourceKey} to ${destinationBucket}/${destinationKey}`);
    } catch (error) {
        console.error('Error copying file:', error);
    }
    
    return `https://neepcocloud.s3.amazonaws.com/${procure_id}%2Bpao.pdf`;
}

