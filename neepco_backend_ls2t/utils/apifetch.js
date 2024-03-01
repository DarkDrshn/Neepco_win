// from express ("express");
import db from "../config/connect.js";
import fs from "fs";
import schedule from "node-schedule";


export const GeM_fetch_new = async (req, res, err) => {
    fs.readFile("./utils/gem_api.json", "utf8", (err, data1) => {
        if (err) {
            throw err;
        }
        data1 = JSON.parse(data1);
        // console.log(req.query.Gem_id);
        let data2 = data1.filter(function (x) {
            if (x.org_id == "GeM_org001" && x.Gem_id == req.query.Gem_id) return true;
            return false;
        });
        // console.log(data2);
        if (data2 == null) {
            res.status(502).json({
                success: false,
                message: "Data doesn't exist",
            });
        } else {
            res.status(200).json({
                success: true,
                data: data2,
            });
        }

    })

}

export const CPP_fetch_new = async (req, res, err) => {
    fs.readFile("./utils/cpp_api.json", "utf8", (err, data1) => {
        if (err) {
            throw err;
        }
        data1 = JSON.parse(data1);
        let data2 = data1.filter(function (x) {
            if (x.org_id == "CPP_org001" && x.Cpp_id == req.body.Cpp_id) return true;
            return false;
        });
        if (data2 == null) {
            res.status(502).json({
                success: false,
                message: "Data doesn't exist",
            });
        } else {
            res.status(502).json({
                success: true,
                data: data2[0],
            });
        }

    })

}



export const GemprcFetch = function () {
    let query = `select portal_id from procurement_details where portal=1 and prc_status=0`;
    db.query(query, (err, data) => {
        if (err) {
            return null;
        } else {
            for (let i = 0; i < data.length; i++) {
                checkAndUpdateGemPrc(data[i]);
            }
        }
    })
}
export const Gem_crac_Fetch = function () {
    let query = `select portal_id from procurement_details where portal=1 and crac_status=0`;
    db.query(query, (err, data) => {
        if (err) {
            return null;
        } else {
            for (let i = 0; i < data.length; i++) {
                checkAndUpdateGem_crac(data[i]);
            }
        }
    })
}


const checkAndUpdateGemPrc = (y) => {
    console.log(y.portal_id)
    fs.readFile("./utils/gem_api.json", "utf8", (err, data) => {
        if (err) {
            // console.log("error in read")
            return null;
        }   
        // console.log("hello")
        let data1 = JSON.parse(data);
        // console.log(req.body.Gem_id);
        let data2 = data1.filter(function (x) {
            if (x.Gem_id == y.portal_id) return true;
            return null;
        });
        // console.log("again hello")
        // console.log(data2)
        if(data2.length==0){
            return null
        }
        // console.log(data2[0].Procurement_details.prc.file_path)
        if (data2[0].Procurement_details.prc_status == true) {

            let query = `update procurement_details set prc_status=?,prc_file_path=? where portal_id=?`;
            // console.log("hehe")
            neepco_gem_prc_path=gem_prc_transfer(data2[0].Procurement_details.prc.file_path, y.id);

            db.query(query, [true, neepco_gem_prc_path /*data2[0].Procurement_details.prc.file_path*/, y.portal_id], (error, data3) => {
                if (error) {
                    // console.log(error)
                    // console.log("error in update")
                    return null;
                } else {
                    // console.log("done great!")
                }
            })
        }
    })
}

const checkAndUpdateGem_crac = (y) => {
    // console.log(y.portal_id)
    fs.readFile("./utils/gem_api.json", "utf8", (err, data) => {
        if (err) {
            // console.log("error in read")
            return null;
        }
        // console.log("hello")
        let data1 = JSON.parse(data);
        // console.log(req.body.Gem_id);
        let data2 = data1.filter(function (x) {
            if (x.Gem_id == y.portal_id) return true;
            return null;
        });
        // console.log("again hello")
        // console.log(data2)
        if(data2.length==0){
            return null
        }
        // console.log(data2[0].Procurement_details.crac.file_path)
        if (data2[0].Procurement_details.crac_status == true) {
            
            let query = "select id from org_emp where GSTIN=?"
            db.query(query, [data2[0].Procurement_details.crac.conisgnee_GSTIN], (err, data3) => {
                if (err) {
                    return null
                } else {
                    query = `update procurement_details set consignee_id=?,crac_status=?,crac_file_path=? where portal_id=?`;
                    // console.log("hehe")
                    // console.log(data3)
                    if(data3.length==0||data3==null)return null;
                    db.query(query, [data3[0].id, true, data2[0].Procurement_details.crac.file_path, y.portal_id], (error, data4) => {
                        if (error) {
                            // console.log(error)
                            // console.log("error in update")
                            return null;
                        } else {
                            // console.log("done great!")
                        }
                    })

                }
            })
        }
    })
}


///cpp prc work 

export const Cpp_prcFetch = function () {
    let query = `select portal_id from procurement_details where portal=2 and prc_status=0`;
    db.query(query, (err, data) => {
        if (err) {
            return null;
        } else {
            for (let i = 0; i < data.length; i++) {
                checkAndUpdate_cpp_prc(data[i]);
            }
        }
    })
}


const checkAndUpdate_cpp_prc = (y) => {
    // console.log(y.portal_id)
    fs.readFile("./utils/cpp_api.json", "utf8", (err, data) => {
        if (err) {
            console.log("error in read")
            return null;
        }
        // console.log("hello")
        let data1 = JSON.parse(data);
        // console.log(req.body.Gem_id);
        let data2 = data1.filter(function (x) {
            if (x.Cpp_id == y.portal_id) return true;
            return null;
        });
        // console.log("again hello")
        // console.log(data2)
        // console.log(data2[0].Procurement_details.prc.file_path)
        if(data2.length==0){
            return null
        }
    
        if (data2[0].Procurement_details.prc_status == true) {
            
            neepco_cpp_prc_path=cpp_prc_transfer(data2[0].Procurement_details.prc.file_path, y.id);
            let query = `update procurement_details set prc_status=?,prc_file_path=? where portal_id=?`;
            // console.log("hehe")
            db.query(query, [true, neepco_cpp_prc_path, y.portal_id], (error, data3) => {
                if (error) {
                    // console.log(error)
                    // console.log("error in update")
                    return null;
                } else {
                    // console.log("done great!")
                }
            })
        }
    })
}


// cpp crac work 

export const Cpp_crac_Fetch = function () {
    let query = `select portal_id from procurement_details where portal=2 and crac_status=0`;
    db.query(query, (err, data) => {
        if (err) {
            return null;
        } else {
            for (let i = 0; i < data.length; i++) {
                checkAndUpdate_cpp_crac(data[i]);
            }
        }
    })
}

const checkAndUpdate_cpp_crac = (y) => {
    // console.log(y.portal_id)
    fs.readFile("./utils/cpp_api.json", "utf8", (err, data) => {
        if (err) {
            // console.log("error in read")
            return null;
        }
        // console.log("hello")
        let data1 = JSON.parse(data);
        // console.log(req.body.Gem_id);
        let data2 = data1.filter(function (x) {
            if (x.Cpp_id== y.portal_id) return true;
            return null;
        });
        // console.log("again hello")
        // console.log(data2)
        // console.log(data2[0].Procurement_details.crac.file_path)
        if(data2.length==0){
            return null
        }


        if (data2[0].Procurement_details.crac_status == true) {
            let query = "select id from org_emp where GSTIN=?"
            neepco_cpp_crac_path
            db.query(query, [data2[0].Procurement_details.crac.conisgnee_GSTIN], (err, data3) => {
                if (err) {
                    return null
                } else {
                    query = `update procurement_details set consignee_id=?,crac_status=?,crac_file_path=? where portal_id=?`;
                    // console.log("hehe")
                    // console.log(data3)
                    if(data3.length==0||data3==null)return null;
                    neepco_cpp_crac_path=cpp_crac_transfer(data2[0].Procurement_details.crac.file_path, data3[0].id)
                    db.query(query, [data3[0].id, true, neepco_cpp_crac_path, y.portal_id], (error, data4) => {
                        if (error) {
                            // console.log(error)
                            // console.log("error in update")
                            return null;
                        } else {
                            // console.log("done great!")
                        }
                    })

                }
            })
        }
    })
}


export const GempaoFetch = function () {
    let query = `select portal_id from procurement_details where portal=1 and payment_status=0`;
    db.query(query, (err, data) => {
        if (err) {
            return null;
        } else {
            for (let i = 0; i < data.length; i++) {
                checkAndUpdateGemPao(data[i]);
            }
        }
    })
}
export const CpppaoFetch = function () {
    let query = `select portal_id from procurement_details where portal=2 and payment_status=0`;
    db.query(query, (err, data) => {
        if (err) {
            return null;
        } else {
            for (let i = 0; i < data.length; i++) {
                checkAndUpdateCppPao(data[i]);
            }
        }
    })
}

const checkAndUpdateGemPao=(y)=>{
    // console.log(y.portal_id)
    fs.readFile("./utils/gem_api.json", "utf8", (err, data) => {
        if (err) {
            // console.log("error in read")
            return null;
        }
        // console.log("hello")
        let data1 = JSON.parse(data);
        // console.log(req.body.Gem_id);
        let data2 = data1.filter(function (x) {
            if (x.Gem_id == y.portal_id) return true;
            return null;
        });
        // console.log("again hello")
        // console.log(data2)
        // console.log(data2[0].Procurement_details.payment.file_path)
        if(data2.length==0){
            return null
        }
        if (data2[0].Procurement_details.payment_status == true) {
            
            let query = "select id from org_emp where GSTIN=?"
            db.query(query, [data2[0].Procurement_details.payment.PAO_GSTIN], (err, data3) => {
                if (err) {
                    return null
                } else {
                    query = `update procurement_details set pao_id=?,payment_status=?,payment_invoice=?,payment_method=?,transaction_id=? where portal_id=?`;
                    // console.log("hehe")
                    // console.log(data3)
                    if(data3.length==0 || data3==null)return null;
                    neepco_gem_pao_path=gem_pao_transfer(data2[0].Procurement_details.payment.invoice,data3[0].id)
                    db.query(query, [data3[0].id,true, neepco_gem_pao_path,data2[0].Procurement_details.payment.payment_mode,data2[0].Procurement_details.payment.transaction_id, y.portal_id], (error, data4) => {
                        if (error) {
                            // console.log(error)
                            // console.log("error in update")
                            return null;
                        } else {
                            // console.log("done great!")
                        }
                    })
                }
            })
        }
    })

}


const checkAndUpdateCppPao=(y)=>{
    // console.log(y.portal_id)
    fs.readFile("./utils/cpp_api.json", "utf8", (err, data) => {
        if (err) {
            // console.log("error in read")
            return null;
        }
        // console.log("hello")
        let data1 = JSON.parse(data);
        // console.log(req.body.Gem_id);
        let data2 = data1.filter(function (x) {
            if (x.Cpp_id == y.portal_id) return true;
            return null;
        });
        // console.log("again hello")
        // console.log(data2)
        // console.log(data2[0].Procurement_details.payment.file_path)
        if(data2.length==0){
            return null
        }
        
        if (data2[0].Procurement_details.payment_status == true) {
            let query = "select id from org_emp where GSTIN=?"
            db.query(query, [data2[0].Procurement_details.payment.PAO_GSTIN], (err, data3) => {
                if (err) {
                    return null
                } else {
                    query = `update procurement_details set pao_id=?,payment_status=?,payment_invoice=?,payment_method=?,transaction_id=? where portal_id=?`;
                    // console.log("hehe")
                    // console.log(data3)
                    if(data3.length==0||data3==null) return null;
                        
                    neepco_cpp_pao_path=cpp_pao_transfer(data2[0].Procurement_details.prc.file_path, y.id);
                    
                    db.query(query, [data3[0].id,true, neepco_cpp_pao_path,data2[0].Procurement_details.payment.payment_mode,data2[0].Procurement_details.payment.transaction_id, y.portal_id], (error, data4) => {
                        if (error) {
                            // console.log(error)
                            // console.log("error in update")
                            return null;
                        } else {
                            // console.log("done great!")
                        }
                    })
                }
            })
        }
    })

}


////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////




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



