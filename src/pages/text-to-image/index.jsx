import Head from "next/head";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import global_data from "../../../public/data/global";
import { v4 as generateUniqueID } from "uuid";
/* Start Import Frame Corner Images */
import normalBlackFrameCornerImage from "../../../public/images/frames/frameCorners/normalBlack.jpg";
import normalWhiteFrameCornerImage from "../../../public/images/frames/frameCorners/normalWhite.jpg";
import normalWoodFrameCornerImage from "../../../public/images/frames/frameCorners/normalWood.jpg";
import normalDarkWoodFrameCornerImage from "../../../public/images/frames/frameCorners/normalDarkWood.jpg";
import hangerBlackFrameCornerImage from "../../../public/images/frames/frameCorners/hangerBlack.jpg";
import hangerWhiteFrameCornerImage from "../../../public/images/frames/frameCorners/hangerWhite.jpg";
import hangerWoodFrameCornerImage from "../../../public/images/frames/frameCorners/hangerWood.jpg";
import hangerDarkWoodFrameCornerImage from "../../../public/images/frames/frameCorners/hangerDarkWood.jpg";
/* End Import Frame Corner Images */
/* Start Import Normal Frame Images */
import normalPosterBlackFrameImageHorizontal from "../../../public/images/frames/normalPoster/black/H/600.png";
import normalPosterBlackFrameImageSquare from "../../../public/images/frames/normalPoster/black/S/600q.png";
import normalPosterBlackFrameImageVertical from "../../../public/images/frames/normalPoster/black/V/600v.png";
import normalPosterWhiteFrameImageHorizontal from "../../../public/images/frames/normalPoster/white/H/600.png";
import normalPosterWhiteFrameImageSquare from "../../../public/images/frames/normalPoster/white/S/600q.png";
import normalPosterWhiteFrameImageVertical from "../../../public/images/frames/normalPoster/white/V/600v.png";
import normalPosterWoodFrameImageHorizontal from "../../../public/images/frames/normalPoster/wood/H/600.png";
import normalPosterWoodFrameImageSquare from "../../../public/images/frames/normalPoster/wood/S/600q.png";
import normalPosterWoodFrameImageVertical from "../../../public/images/frames/normalPoster/wood/V/600v.png";
import normalPosterDarkWoodFrameImageHorizontal from "../../../public/images/frames/normalPoster/darkWood/H/600.png";
import normalPosterDarkWoodFrameImageSquare from "../../../public/images/frames/normalPoster/darkWood/S/600q.png";
import normalPosterDarkWoodFrameImageVertical from "../../../public/images/frames/normalPoster/darkWood/V/600v.png";
/* End Import normalPoster Frame Images */
/* Start Import Frame With Hangers Images */
import posterWithHangersBlackFrameImageHorizontal from "../../../public/images/frames/posterWithHangers/black/H/600.png";
import posterWithHangersBlackFrameImageSquare from "../../../public/images/frames/posterWithHangers/black/S//600.png";
import posterWithHangersBlackFrameImageVertical from "../../../public/images/frames/posterWithHangers/black/V/600.png";
import posterWithHangersWhiteFrameImageHorizontal from "../../../public/images/frames/posterWithHangers/white/H/600.png";
import posterWithHangersWhiteFrameImageSquare from "../../../public/images/frames/posterWithHangers/white/S/600.png";
import posterWithHangersWhiteFrameImageVertical from "../../../public/images/frames/posterWithHangers/white/V/600.png";
import posterWithHangersWoodFrameImageHorizontal from "../../../public/images/frames/posterWithHangers/wood/H/600.png";
import posterWithHangersWoodFrameImageSquare from "../../../public/images/frames/posterWithHangers/wood/S/600.png";
import posterWithHangersWoodFrameImageVertical from "../../../public/images/frames/posterWithHangers/wood/V/600.png";
import posterWithHangersDarkWoodFrameImageHorizontal from "../../../public/images/frames/posterWithHangers/darkWood/H/600.png";
import posterWithHangersDarkWoodFrameImageSquare from "../../../public/images/frames/posterWithHangers/darkWood/S/600.png";
import posterWithHangersDarkWoodFrameImageVertical from "../../../public/images/frames/posterWithHangers/darkWood/V/600.png";
/* End Import Frame With Hangers Images */
/* Start Import Frames Without Background Never Images */
import HorizontalframeImageWithFullTransparent from "../../../public/images/frames/withFullTransparent/H/H.png";
import SquareframeImageWithFullTransparent from "../../../public/images/frames/withFullTransparent/S/S.png";
import VerticalframeImageWithFullTransparent from "../../../public/images/frames/withFullTransparent/V/V.png";
/* End Import Frames Without Background Never Images */
import room1Image from "@/../../public/images/Rooms/room1.jpg";
import room2Image from "@/../../public/images/Rooms/room2.jpg";
import { BiError } from "react-icons/bi";
import LoaderPage from "@/components/LoaderPage";
import Carousel from 'react-bootstrap/Carousel';
import PaintingDetails from "@/components/PaintingDetails";
import Footer from "@/components/Footer";
import Slider from "react-slick";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";
import Inspiration from "@/components/Inspiration";
import InspirationImage1ForTextToImage from "@/../public/images/Inspiration/TextToImagePage/1.webp";
import InspirationImage2ForTextToImage from "@/../public/images/Inspiration/TextToImagePage/2.webp";
import InspirationImage3ForTextToImage from "@/../public/images/Inspiration/TextToImagePage/3.webp";
import InspirationImage4ForTextToImage from "@/../public/images/Inspiration/TextToImagePage/4.webp";
import InspirationImage5ForTextToImage from "@/../public/images/Inspiration/TextToImagePage/5.webp";
import InspirationImage6ForTextToImage from "@/../public/images/Inspiration/TextToImagePage/6.webp";
import InspirationImage7ForTextToImage from "@/../public/images/Inspiration/TextToImagePage/7.webp";
import InspirationImage8ForTextToImage from "@/../public/images/Inspiration/TextToImagePage/8.webp";
import CustomersComments from "@/components/CustomersComments";
import WaitGeneratingImage from "@/components/WaitGeneratingImage";
import { getAllCategoriesForService, getStylesForCategoryInService, getAppearedSlidesCount } from "../../../public/global_functions/popular";
import GeneratedImagesViewer from "@/components/GeneratedImagesViewer";
import MoreGeneratedImagesViewer from "@/components/MoreGeneratedImagesViewer";

export default function TextToImage({
    generatedImageId,
    paintingTypeAsQuery,
}) {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const [errorMsgOnLoadingThePage, setErrorMsgOnLoadingThePage] = useState("");

    const [windowInnerWidth, setWindowInnerWidth] = useState(149);

    const [textPrompt, setTextPrompt] = useState("En flicka flyger med ett färgglatt paraply i himlen");

    const [generatedImageURL, setGeneratedImageURL] = useState("");

    const [generatedImagePathInMyServer, setGeneratedImagePathInMyServer] = useState("");

    const [isWaitStatus, setIsWaitStatus] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");

    const [categorySelectedIndex, setCategorySelectedIndex] = useState(0);

    const [styleSelectedIndex, setStyleSelectedIndex] = useState(0);

    const [modelName, setModelName] = useState("");

    const [productPriceBeforeDiscount, setProductPriceBeforeDiscount] = useState(0);

    const [productPriceAfterDiscount, setProductPriceAfterDiscount] = useState(0);

    const [imageType, setImageType] = useState("vertical");

    const [paintingType, setPaintingType] = useState("poster");

    const [isExistWhiteBorderWithPoster, setIsExistWhiteBorderWithPoster] = useState("without-border");

    const [frameColor, setFrameColor] = useState("none");

    const [dimentions, setDimentions] = useState({});

    const [dimentionsInCm, setDimentionsInCm] = useState("");

    const [categoriesData, setCategoriesData] = useState([]);

    const [categoryStyles, setCategoryStyles] = useState([]);

    const [isWaitAddToCart, setIsWaitAddToCart] = useState(false);

    const [isSuccessAddToCart, setIsSuccessAddToCart] = useState(false);

    const [errorInAddToCart, setErrorInAddToCart] = useState("");

    const [isWaitGetProductPrice, setIsWaitGetProductPrice] = useState(false);

    const [tempImageType, setTempImageType] = useState("vertical");

    const [tempDimentionsInCm, setTempDimentionsInCm] = useState("");

    const [imageMode, setImageMode] = useState("normal-size-image");

    const [generatedImagesData, setGeneratedImagesData] = useState([]);

    const [newTotalProductsCount, setNewTotalProductsCount] = useState(0);

    const [selectedPreviousGeneratedImageIndex, setSelectedPreviousGeneratedImageIndex] = useState(-1);

    const [isShowMoreGeneratedImages, setIsShowMoreGeneratedImages] = useState(false);

    const [appearedArtPaintingOptionSection, setAppearedArtPaintingOptionSection] = useState("style-options");

    const frameImages = {
        "poster-with-wooden-frame": {
            "square": {
                "natural-wood": {
                    "30x30": normalPosterWoodFrameImageSquare.src,
                    "50x50": normalPosterWoodFrameImageSquare.src,
                    "70x70": normalPosterWoodFrameImageSquare.src,
                },
                "black": {
                    "30x30": normalPosterBlackFrameImageSquare.src,
                    "50x50": normalPosterBlackFrameImageSquare.src,
                    "70x70": normalPosterBlackFrameImageSquare.src,
                },
                "white": {
                    "30x30": normalPosterWhiteFrameImageSquare.src,
                    "50x50": normalPosterWhiteFrameImageSquare.src,
                    "70x70": normalPosterWhiteFrameImageSquare.src,
                },
                "dark-wood": {
                    "30x30": normalPosterDarkWoodFrameImageSquare.src,
                    "50x50": normalPosterDarkWoodFrameImageSquare.src,
                    "70x70": normalPosterDarkWoodFrameImageSquare.src,
                },
            },
            "vertical": {
                "natural-wood": {
                    "21x30": normalPosterWoodFrameImageVertical.src,
                    "30x40": normalPosterWoodFrameImageVertical.src,
                    "50x70": normalPosterWoodFrameImageVertical.src,
                    "70x100": normalPosterWoodFrameImageVertical.src,
                },
                "black": {
                    "21x30": normalPosterBlackFrameImageVertical.src,
                    "30x40": normalPosterBlackFrameImageVertical.src,
                    "50x70": normalPosterBlackFrameImageVertical.src,
                    "70x100": normalPosterBlackFrameImageVertical.src,
                },
                "white": {
                    "21x30": normalPosterWhiteFrameImageVertical.src,
                    "30x40": normalPosterWhiteFrameImageVertical.src,
                    "50x70": normalPosterWhiteFrameImageVertical.src,
                    "70x100": normalPosterWhiteFrameImageVertical.src,
                },
                "dark-wood": {
                    "21x30": normalPosterDarkWoodFrameImageVertical.src,
                    "30x40": normalPosterDarkWoodFrameImageVertical.src,
                    "50x70": normalPosterDarkWoodFrameImageVertical.src,
                    "70x100": normalPosterDarkWoodFrameImageVertical.src,
                },
            },
            "horizontal": {
                "natural-wood": {
                    "30x21": normalPosterWoodFrameImageHorizontal.src,
                    "40x30": normalPosterWoodFrameImageHorizontal.src,
                    "70x50": normalPosterWoodFrameImageHorizontal.src,
                    "100x70": normalPosterWoodFrameImageHorizontal.src,
                },
                "black": {
                    "30x21": normalPosterBlackFrameImageHorizontal.src,
                    "40x30": normalPosterBlackFrameImageHorizontal.src,
                    "70x50": normalPosterBlackFrameImageHorizontal.src,
                    "100x70": normalPosterBlackFrameImageHorizontal.src,
                },
                "white": {
                    "30x21": normalPosterWhiteFrameImageHorizontal.src,
                    "40x30": normalPosterWhiteFrameImageHorizontal.src,
                    "70x50": normalPosterWhiteFrameImageHorizontal.src,
                    "100x70": normalPosterWhiteFrameImageHorizontal.src,
                },
                "dark-wood": {
                    "30x21": normalPosterDarkWoodFrameImageHorizontal.src,
                    "40x30": normalPosterDarkWoodFrameImageHorizontal.src,
                    "70x50": normalPosterDarkWoodFrameImageHorizontal.src,
                    "100x70": normalPosterDarkWoodFrameImageHorizontal.src,
                },
            }
        },
        "poster-with-hangers": {
            "square": {
                "natural-wood": {
                    "30x30": posterWithHangersWoodFrameImageSquare.src,
                    "50x50": posterWithHangersWoodFrameImageSquare.src,
                    "70x70": posterWithHangersWoodFrameImageSquare.src,
                },
                "black": {
                    "30x30": posterWithHangersBlackFrameImageSquare.src,
                    "50x50": posterWithHangersBlackFrameImageSquare.src,
                    "70x70": posterWithHangersBlackFrameImageSquare.src,
                },
                "white": {
                    "30x30": posterWithHangersWhiteFrameImageSquare.src,
                    "50x50": posterWithHangersWhiteFrameImageSquare.src,
                    "70x70": posterWithHangersWhiteFrameImageSquare.src,
                },
                "dark-wood": {
                    "30x30": posterWithHangersDarkWoodFrameImageSquare.src,
                    "50x50": posterWithHangersDarkWoodFrameImageSquare.src,
                    "70x70": posterWithHangersDarkWoodFrameImageSquare.src,
                },
            },
            "vertical": {
                "natural-wood": {
                    "21x30": posterWithHangersWoodFrameImageVertical.src,
                    "30x40": posterWithHangersWoodFrameImageVertical.src,
                    "50x70": posterWithHangersWoodFrameImageVertical.src,
                    "70x100": posterWithHangersWoodFrameImageVertical.src,
                },
                "black": {
                    "21x30": posterWithHangersBlackFrameImageVertical.src,
                    "30x40": posterWithHangersBlackFrameImageVertical.src,
                    "50x70": posterWithHangersBlackFrameImageVertical.src,
                    "70x100": posterWithHangersBlackFrameImageVertical.src,
                },
                "white": {
                    "21x30": posterWithHangersWhiteFrameImageVertical.src,
                    "30x40": posterWithHangersWhiteFrameImageVertical.src,
                    "50x70": posterWithHangersWhiteFrameImageVertical.src,
                    "70x100": posterWithHangersWhiteFrameImageVertical.src,
                },
                "dark-wood": {
                    "21x30": posterWithHangersDarkWoodFrameImageVertical.src,
                    "30x40": posterWithHangersDarkWoodFrameImageVertical.src,
                    "50x70": posterWithHangersDarkWoodFrameImageVertical.src,
                    "70x100": posterWithHangersDarkWoodFrameImageVertical.src,
                },
            },
            "horizontal": {
                "natural-wood": {
                    "30x21": posterWithHangersWoodFrameImageHorizontal.src,
                    "40x30": posterWithHangersWoodFrameImageHorizontal.src,
                    "70x50": posterWithHangersWoodFrameImageHorizontal.src,
                    "100x70": posterWithHangersWoodFrameImageHorizontal.src,
                },
                "black": {
                    "30x21": posterWithHangersBlackFrameImageHorizontal.src,
                    "40x30": posterWithHangersBlackFrameImageHorizontal.src,
                    "70x50": posterWithHangersBlackFrameImageHorizontal.src,
                    "100x70": posterWithHangersBlackFrameImageHorizontal.src,
                },
                "white": {
                    "30x21": posterWithHangersWhiteFrameImageHorizontal.src,
                    "40x30": posterWithHangersWhiteFrameImageHorizontal.src,
                    "70x50": posterWithHangersWhiteFrameImageHorizontal.src,
                    "100x70": posterWithHangersWhiteFrameImageHorizontal.src,
                },
                "dark-wood": {
                    "30x21": posterWithHangersDarkWoodFrameImageHorizontal.src,
                    "40x30": posterWithHangersDarkWoodFrameImageHorizontal.src,
                    "70x50": posterWithHangersDarkWoodFrameImageHorizontal.src,
                    "100x70": posterWithHangersDarkWoodFrameImageHorizontal.src,
                },
            }
        },
        "full-transparent": {
            "square": {
                "30x30": SquareframeImageWithFullTransparent.src,
                "50x50": SquareframeImageWithFullTransparent.src,
                "70x70": SquareframeImageWithFullTransparent.src,
            },
            "vertical": {
                "21x30": VerticalframeImageWithFullTransparent.src,
                "30x40": VerticalframeImageWithFullTransparent.src,
                "50x70": VerticalframeImageWithFullTransparent.src,
                "70x100": VerticalframeImageWithFullTransparent.src,
            },
            "horizontal": {
                "30x21": HorizontalframeImageWithFullTransparent.src,
                "40x30": HorizontalframeImageWithFullTransparent.src,
                "70x50": HorizontalframeImageWithFullTransparent.src,
                "100x70": HorizontalframeImageWithFullTransparent.src,
            },
        }
    }

    const inspirationImgSrcs = [
        InspirationImage1ForTextToImage.src,
        InspirationImage2ForTextToImage.src,
        InspirationImage3ForTextToImage.src,
        InspirationImage4ForTextToImage.src,
        InspirationImage5ForTextToImage.src,
        InspirationImage6ForTextToImage.src,
        InspirationImage7ForTextToImage.src,
        InspirationImage8ForTextToImage.src,
    ];

    useEffect(() => {
        setWindowInnerWidth(window.innerWidth);
        window.addEventListener("resize", function () {
            setWindowInnerWidth(this.innerWidth);
        });
    }, []);

    useEffect(() => {
        setIsLoadingPage(true);
        getAllCategoriesForService("text-to-image")
            .then(async (result) => {
                setCategoriesData(result.data);
                result = await getStylesForCategoryInService("text-to-image", result.data[0].name);
                setCategoryStyles(result.data);
                const tempModelName = result.data[0].modelName;
                setModelName(tempModelName);
                await handleSelectGeneratedImageIdAndPaintingType(tempModelName, paintingTypeAsQuery === "canvas" ? "30x40" : "21x30");
                setGeneratedImagesData(JSON.parse(localStorage.getItem("tavlorify-store-user-generated-images-data-text-to-image")));
                setIsLoadingPage(false);
            })
            .catch((err) => {
                setIsLoadingPage(false);
                setErrorMsgOnLoadingThePage(err?.message === "Network Error" ? "Network Error" : "Sorry, Something Went Wrong, Please Try Again !!");
            });
    }, [generatedImageId, paintingTypeAsQuery]);

    const handleSelectProduct = async (productData) => {
        try {
            setPaintingType(productData.paintingType);
            setImageType(productData.position);
            setDimentionsInCm(productData.size);
            const dimsIndex = global_data.modelsDimentions[productData.modelName][productData.position].findIndex((el) => el.inCm == productData.size);
            setDimentions({
                width: global_data.modelsDimentions[productData.modelName][productData.position][dimsIndex].inPixel.width,
                height: global_data.modelsDimentions[productData.modelName][productData.position][dimsIndex].inPixel.height,
            });
            setIsExistWhiteBorderWithPoster(productData.isExistWhiteBorder);
            setFrameColor(productData.frameColor);
            setGeneratedImagePathInMyServer(productData.generatedImageURL);
            setTempImageType(productData.position);
            setTempDimentionsInCm(productData.size);
            setGeneratedImageURL(`${process.env.BASE_API_URL}/${productData.generatedImageURL}`);
            await getProductPrice(productData.paintingType, productData.position, productData.size);
        }
        catch (err) {
            throw err;
        }
    }

    const handleSelectGeneratedImageIdAndPaintingType = async (modelName, dimentionsInCm) => {
        try {
            if (generatedImageId) {
                let allProductsData = JSON.parse(localStorage.getItem("tavlorify-store-user-cart"));
                if (Array.isArray(allProductsData)) {
                    if (allProductsData.length > 0) {
                        const productData = allProductsData.find((productData) => productData._id === generatedImageId && productData.service === "text-to-image");
                        if (productData) {
                            productData.modelName = modelName;
                            await handleSelectProduct(productData);
                        } else {
                            await handleSelectProduct({
                                modelName,
                                paintingType: "poster",
                                position: "vertical",
                                size: dimentionsInCm,
                                isExistWhiteBorder: "without-border",
                                frameColor: "none",
                                generatedImageURL: "assets/images/generatedImages/previewImageForTextToImage.png",
                            });
                        }
                    }
                } else {
                    await handleSelectProduct({
                        modelName,
                        paintingType: paintingTypeAsQuery,
                        position: "vertical",
                        size: dimentionsInCm,
                        isExistWhiteBorder: "without-border",
                        frameColor: "none",
                        generatedImageURL: "assets/images/generatedImages/previewImageForTextToImage.png",
                    });
                }
            } else {
                await handleSelectProduct({
                    modelName,
                    paintingType: paintingTypeAsQuery,
                    position: "vertical",
                    size: dimentionsInCm,
                    isExistWhiteBorder: "without-border",
                    frameColor: "none",
                    generatedImageURL: "assets/images/generatedImages/previewImageForTextToImage.png",
                });
            }
        }
        catch (err) {
            throw err;
        }
    }

    const handleSelectCategory = async (categoryIndex) => {
        try {
            if (!isWaitStatus) {
                setAppearedArtPaintingOptionSection("style-options");
                setCategorySelectedIndex(categoryIndex);
                const result = await getStylesForCategoryInService("text-to-image", categoriesData[categoryIndex].name);
                setCategoryStyles(result.data);
                setStyleSelectedIndex(0);
                const tempModelName = result.data[0].modelName;
                setModelName(tempModelName);
                const dimsIndex = global_data.modelsDimentions[tempModelName][imageType].findIndex((el) => el.inCm == dimentionsInCm);
                setDimentions({
                    width: global_data.modelsDimentions[tempModelName][imageType][dimsIndex].inPixel.width,
                    height: global_data.modelsDimentions[tempModelName][imageType][dimsIndex].inPixel.height,
                });
            }
        }
        catch (err) {
            throw err;
        }
    }

    const handleSelectStyle = (styleIndex) => {
        if (!isWaitStatus) {
            let tempModelName = categoryStyles[styleIndex].modelName;
            setModelName(tempModelName);
            const dimsIndex = global_data.modelsDimentions[tempModelName][imageType].findIndex((el) => el.inCm == dimentionsInCm);
            setDimentions({
                width: global_data.modelsDimentions[tempModelName][imageType][dimsIndex].inPixel.width,
                height: global_data.modelsDimentions[tempModelName][imageType][dimsIndex].inPixel.height,
            });
            setStyleSelectedIndex(styleIndex);
        }
    }

    const handleSelectPaintingType = async (paintingType) => {
        try {
            if (!isWaitStatus) {
                if (
                    paintingType === "canvas" ||
                    paintingType === "poster" ||
                    paintingType === "poster-with-wooden-frame" ||
                    paintingType === "poster-with-hangers"
                ) {
                    switch (imageType) {
                        case "vertical": {
                            await handleSelectImageType(imageType, paintingType);
                            break;
                        }
                        case "horizontal": {
                            await handleSelectImageType(imageType, paintingType);
                            break;
                        }
                        case "square": {
                            await handleSelectImageType(imageType, paintingType);
                            break;
                        }
                        default: {
                            throw Error("Sorry, Invalid Image Orientation !!");
                        }
                    }
                    if (paintingType === "canvas") {
                        setIsExistWhiteBorderWithPoster("without-border");
                        setFrameColor("none");
                    }
                    setPaintingType(paintingType);
                }
            }
        }
        catch (err) {
            throw err;
        }
    }

    const handleSelectImageType = async (imgType, paintingType) => {
        try {
            if (!isWaitStatus) {
                setImageType(imgType);
                switch (imgType) {
                    case "horizontal": {
                        const tempDimentionsInCm = "70x50";
                        setDimentionsInCm(tempDimentionsInCm);
                        const dimsIndex = global_data.modelsDimentions[modelName][imgType].findIndex((el) => el.inCm == tempDimentionsInCm);
                        setDimentions({
                            width: global_data.modelsDimentions[modelName][imgType][dimsIndex].inPixel.width,
                            height: global_data.modelsDimentions[modelName][imgType][dimsIndex].inPixel.height,
                        });
                        await getProductPrice(paintingType, imgType, tempDimentionsInCm);
                        break;
                    }
                    case "vertical": {
                        const tempDimentionsInCm = "50x70";
                        setDimentionsInCm(tempDimentionsInCm);
                        const dimsIndex = global_data.modelsDimentions[modelName][imgType].findIndex((el) => el.inCm == tempDimentionsInCm);
                        setDimentions({
                            width: global_data.modelsDimentions[modelName][imgType][dimsIndex].inPixel.width,
                            height: global_data.modelsDimentions[modelName][imgType][dimsIndex].inPixel.height,
                        });
                        await getProductPrice(paintingType, imgType, tempDimentionsInCm);
                        break;
                    }
                    case "square": {
                        const tempDimentionsInCm = "30x30";
                        setDimentionsInCm(tempDimentionsInCm);
                        const dimsIndex = global_data.modelsDimentions[modelName][imgType].findIndex((el) => el.inCm == tempDimentionsInCm);
                        setDimentions({
                            width: global_data.modelsDimentions[modelName][imgType][dimsIndex].inPixel.width,
                            height: global_data.modelsDimentions[modelName][imgType][dimsIndex].inPixel.height,
                        });
                        await getProductPrice(paintingType, imgType, tempDimentionsInCm);
                        break;
                    }
                    default: {
                        throw Error("Sorry, Invalid Image Orientation !!");
                    }
                }
            }
        }
        catch (err) {
            throw err;
        }
    }

    const handleSelectImageDimentions = async (inCm) => {
        try {
            if (!isWaitStatus) {
                const dimsIndex = global_data.modelsDimentions[modelName][imageType].findIndex((el) => el.inCm == inCm);
                setDimentionsInCm(inCm);
                setDimentions({
                    width: global_data.modelsDimentions[modelName][imageType][dimsIndex].inPixel.width,
                    height: global_data.modelsDimentions[modelName][imageType][dimsIndex].inPixel.height,
                });
                await getProductPrice(paintingType, imageType, inCm);
            }
        }
        catch (err) {
            throw err;
        }
    }

    const handleIsExistWhiteBorderWithPoster = (isExistWhiteBorderWithPoster) => {
        if (!isWaitStatus) {
            setIsExistWhiteBorderWithPoster(isExistWhiteBorderWithPoster);
        }
    }

    const handleSelectFrame = async (paintingType, frameColor) => {
        try {
            if (!isWaitStatus) {
                setPaintingType(paintingType);
                setFrameColor(frameColor);
                await getProductPrice(paintingType, imageType, dimentionsInCm);
            }
        }
        catch (err) {
            throw err;
        }
    }

    const generateImageFromText = async (e) => {
        try {
            e.preventDefault();
            window.scrollTo({
                behavior: "smooth",
                top: 60,
                left: 0,
            });
            setIsWaitStatus(true);
            const result = (await axios.get(
                `${process.env.BASE_API_URL}/generated-images/generate-image-using-text-to-image-service?textPrompt=${textPrompt}&styleId=${categoryStyles[styleSelectedIndex]._id}&position=${imageType}&dimentionsInCm=${dimentionsInCm}&paintingType=${paintingType}&isExistWhiteBorder=${isExistWhiteBorderWithPoster}&frameColor=${frameColor}&width=${dimentions.width}&height=${dimentions.height}
            `)).data;
            const imageURL = `${process.env.BASE_API_URL}/${result.data}`;
            setTempImageType(imageType);
            setTempDimentionsInCm(dimentionsInCm);
            setIsWaitStatus(false);
            setGeneratedImageURL(imageURL);
            setGeneratedImagePathInMyServer(result.data);
            saveNewGeneratedImageDataInLocalStorage({
                service: "text-to-image",
                uploadedImageURL: "",
                categoryName: categoriesData[categorySelectedIndex].name,
                styleName: categoryStyles[styleSelectedIndex].name,
                paintingType: paintingType,
                position: imageType,
                size: dimentionsInCm,
                isExistWhiteBorder: isExistWhiteBorderWithPoster,
                width: dimentions.width,
                height: dimentions.height,
                frameColor: frameColor,
                generatedImageURL: result.data,
                _id: generateUniqueID(),
            });
        }
        catch (err) {
            setIsWaitStatus(false);
            setErrorMsg("Sorry, Something Went Wrong, Please Repeate This Process !!");
            let errorMsgTimeout = setTimeout(() => {
                setErrorMsg("");
                clearTimeout(errorMsgTimeout);
            }, 3000);
        }
    }

    const saveNewGeneratedImageDataInLocalStorage = (generatedImageData) => {
        let tavlorifyStoreUserGeneratedImagesDataForTextToImage = JSON.parse(localStorage.getItem("tavlorify-store-user-generated-images-data-text-to-image"));
        if (tavlorifyStoreUserGeneratedImagesDataForTextToImage) {
            tavlorifyStoreUserGeneratedImagesDataForTextToImage.unshift(generatedImageData);
            if (tavlorifyStoreUserGeneratedImagesDataForTextToImage.length > 30) {
                tavlorifyStoreUserGeneratedImagesDataForTextToImage = tavlorifyStoreUserGeneratedImagesDataForTextToImage.slice(0, 30);
            }
            localStorage.setItem("tavlorify-store-user-generated-images-data-text-to-image", JSON.stringify(tavlorifyStoreUserGeneratedImagesDataForTextToImage));
            setGeneratedImagesData(tavlorifyStoreUserGeneratedImagesDataForTextToImage);
        } else {
            let tavlorifyStoreUserGeneratedImagesDataForTextToImage = [];
            tavlorifyStoreUserGeneratedImagesDataForTextToImage.unshift(generatedImageData);
            localStorage.setItem("tavlorify-store-user-generated-images-data-text-to-image", JSON.stringify(tavlorifyStoreUserGeneratedImagesDataForTextToImage));
            setGeneratedImagesData(tavlorifyStoreUserGeneratedImagesDataForTextToImage);
        }
    }

    const displayPreviousGeneratedImageInsideArtPainting = async (generatedImageData, selectedImageIndex) => {
        try {
            setTextPrompt(generatedImageData.textPrompt);
            const tempPaintingType = generatedImageData.paintingType;
            setPaintingType(tempPaintingType);
            const tempPosition = generatedImageData.position;
            setImageType(tempPosition);
            const tempImageSize = generatedImageData.size;
            setDimentionsInCm(tempImageSize);
            setTempImageType(generatedImageData.position);
            setTempDimentionsInCm(tempImageSize);
            setDimentions({
                width: generatedImageData.width,
                height: generatedImageData.height,
            });
            setIsExistWhiteBorderWithPoster(generatedImageData.isExistWhiteBorder);
            setFrameColor(generatedImageData.frameColor);
            setGeneratedImageURL(`${process.env.BASE_API_URL}/${generatedImageData.generatedImageURL}`);
            setGeneratedImagePathInMyServer(generatedImageData.generatedImageURL);
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
            await getProductPrice(tempPaintingType, tempPosition, tempImageSize);
            setSelectedPreviousGeneratedImageIndex(selectedImageIndex);
        }
        catch (err) {
            throw err;
        }
    }

    const addToCart = () => {
        setIsWaitAddToCart(true);
        if (tempImageType !== imageType) {
            setIsWaitAddToCart(false);
            setErrorInAddToCart(`Please Select ${tempImageType} Position`);
            let errorTimeoutInAddToCart = setTimeout(() => {
                setErrorInAddToCart("");
                clearTimeout(errorTimeoutInAddToCart);
            }, 1500);
        } else {
            let allProductsData = JSON.parse(localStorage.getItem("tavlorify-store-user-cart"));
            if (allProductsData) {
                const productIndex = allProductsData.findIndex((productData) => productData.paintingType === paintingType &&
                    productData.position === tempImageType &&
                    productData.size === dimentionsInCm &&
                    productData.isExistWhiteBorder === isExistWhiteBorderWithPoster &&
                    productData.frameColor === frameColor &&
                    productData.generatedImageURL === generatedImagePathInMyServer &&
                    productData.service === "text-to-image",
                );
                if (productIndex < 0) {
                    const productInfoToCart = {
                        _id: generateUniqueID(),
                        paintingType,
                        isExistWhiteBorder: isExistWhiteBorderWithPoster,
                        frameColor,
                        position: tempImageType,
                        size: dimentionsInCm,
                        priceBeforeDiscount: productPriceBeforeDiscount,
                        priceAfterDiscount: productPriceAfterDiscount,
                        generatedImageURL: generatedImagePathInMyServer,
                        quantity: 1,
                        service: "text-to-image",
                    }
                    allProductsData.push(productInfoToCart);
                    localStorage.setItem("tavlorify-store-user-cart", JSON.stringify(allProductsData));
                    setIsWaitAddToCart(false);
                    setIsSuccessAddToCart(true);
                    let successAddToCartTimeout = setTimeout(() => {
                        setIsSuccessAddToCart(false);
                        clearTimeout(successAddToCartTimeout);
                    }, 1500);
                    setNewTotalProductsCount(allProductsData.length);
                } else {
                    setIsWaitAddToCart(false);
                    setErrorInAddToCart(`Sorry, This Product Is Already Exist !!`);
                    let errorTimeoutInAddToCart = setTimeout(() => {
                        setErrorInAddToCart("");
                        clearTimeout(errorTimeoutInAddToCart);
                    }, 1500);
                }
            } else {
                const productInfoToCart = {
                    _id: generateUniqueID(),
                    paintingType,
                    isExistWhiteBorder: isExistWhiteBorderWithPoster,
                    frameColor,
                    position: tempImageType,
                    size: dimentionsInCm,
                    priceBeforeDiscount: productPriceBeforeDiscount,
                    priceAfterDiscount: productPriceAfterDiscount,
                    generatedImageURL: generatedImagePathInMyServer,
                    quantity: 1,
                    service: "text-to-image",
                }
                let allProductsData = [];
                allProductsData.push(productInfoToCart);
                localStorage.setItem("tavlorify-store-user-cart", JSON.stringify(allProductsData));
                setIsWaitAddToCart(false);
                setIsSuccessAddToCart(true);
                let successAddToCartTimeout = setTimeout(() => {
                    setIsSuccessAddToCart(false);
                    clearTimeout(successAddToCartTimeout);
                }, 1500);
                setNewTotalProductsCount(allProductsData.length);
            }
        }
    }

    const handleDisplayImageMode = (imageMode) => {
        if (imageMode === "minimize-image" && windowInnerWidth >= 991) {
            setImageMode("normal-size-image");
        }
        if (imageMode === "image-inside-room1" && windowInnerWidth >= 991) {
            setImageMode("image-inside-room1");
        }
        if (imageMode === "image-inside-room2" && windowInnerWidth >= 991) {
            setImageMode("image-inside-room2");
        }
    }

    const getSuitableWidthAndHeightForPainting = (dimention, imageSize, isRoomImageMinimize, windowInnerWidth) => {
        if (!isRoomImageMinimize) {
            if (imageSize === "minimize-image") {
                if (windowInnerWidth > 320 && windowInnerWidth < 400) return dimention / 5;
                if (windowInnerWidth >= 400 && windowInnerWidth < 500) return dimention / 4.1;
                if (windowInnerWidth >= 550 && windowInnerWidth < 650) return dimention / 2.7;
                if (windowInnerWidth >= 650 && windowInnerWidth < 991) return dimention / 2.3;
                return dimention / 3;
            } else return windowInnerWidth < 767 ? dimention / 1.3 : dimention;
        } else {
            if (windowInnerWidth < 991) {
                if (windowInnerWidth > 320 && windowInnerWidth < 400) return dimention / 5;
                if (windowInnerWidth >= 400 && windowInnerWidth < 500) return dimention / 4.1;
                if (windowInnerWidth >= 550 && windowInnerWidth < 650) return dimention / 2.7;
                if (windowInnerWidth >= 650 && windowInnerWidth < 991) return dimention / 2.3;
                return dimention / 3;
            }
            return dimention / 10;
        }
    }

    const getArtPaintingBox = (width, imageSize, isImageInsideRoom, isRoomImageMinimize) => {
        return (
            (imageMode == "normal-size-image" || imageSize === "minimize-image") && <div
                className={`art-painting d-flex justify-content-center align-items-center mb-4 ${imageSize === "minimize-image" ? "minimize-art-painting" : ""}`}
                onClick={() => handleDisplayImageMode(imageSize)}
                style={
                    {
                        cursor: !isWaitStatus && imageSize === "minimize-image" && !isImageInsideRoom ? "pointer" : "",
                        position: !imageSize ? "sticky" : "",
                        top: !imageSize ? "90px" : "",
                    }
                }
            >
                {(paintingType === "poster" || paintingType === "poster-with-wooden-frame" || paintingType === "poster-with-hangers") && <>
                    <div
                        className="frame-image-box"
                        style={{
                            width: getSuitableWidthAndHeightForPainting(global_data.framesDimentions[paintingType][tempImageType][tempDimentionsInCm].width, imageSize, isRoomImageMinimize, windowInnerWidth),
                            maxHeight: getSuitableWidthAndHeightForPainting(global_data.framesDimentions[paintingType][tempImageType][tempDimentionsInCm].height, imageSize, isRoomImageMinimize, windowInnerWidth),
                        }}
                    >
                        {!isWaitStatus && !errorMsg && generatedImageURL && <img
                            src={frameColor !== "none" ? frameImages[paintingType][tempImageType][frameColor][tempDimentionsInCm] : frameImages["full-transparent"][tempImageType][tempDimentionsInCm]}
                            alt="Image"
                            onDragStart={(e) => e.preventDefault()}
                        />}
                    </div>
                    <div
                        className="generated-image-box d-flex align-items-center justify-content-center"
                        style={{
                            width: getSuitableWidthAndHeightForPainting(global_data.appearedImageSizesForTextToImage[paintingType]["without-border"][tempImageType][tempDimentionsInCm].width, imageSize, isRoomImageMinimize, windowInnerWidth),
                            height: getSuitableWidthAndHeightForPainting(global_data.appearedImageSizesForTextToImage[paintingType]["without-border"][tempImageType][tempDimentionsInCm].height, imageSize, isRoomImageMinimize, windowInnerWidth),
                            boxShadow: isExistWhiteBorderWithPoster === "with-border" && generatedImageURL ? "1px 1px 2px #000, -1px -1px 2px #000" : "",
                            backgroundColor: isExistWhiteBorderWithPoster === "with-border" && generatedImageURL ? "#FFF" : "",
                            maxWidth: "97.5%",
                            maxHeight: "97.5%",
                        }}
                    >
                        {!isWaitStatus && !errorMsg && generatedImageURL && <img
                            src={generatedImageURL}
                            alt="Generated Image !!"
                            style={{
                                maxWidth: isExistWhiteBorderWithPoster === "with-border" ? "89.7%" : "100%",
                                maxHeight: isExistWhiteBorderWithPoster === "with-border" ? "89.7%" : "100%",
                            }}
                            onDragStart={(e) => e.preventDefault()}
                        />}
                    </div>
                </>}
                {paintingType === "canvas" && !isWaitStatus && !errorMsg && <div className="canvas-image-box" style={{
                    width: getSuitableWidthAndHeightForPainting(global_data.appearedImageSizesForTextToImage[paintingType]["without-border"][tempImageType][tempDimentionsInCm].width, imageSize, isRoomImageMinimize, windowInnerWidth),
                }}>
                    <img
                        src={generatedImageURL}
                        className={
                            !isImageInsideRoom ? (
                                imageSize !== "minimize-image" ? "canvas-image" : "minimize-canvas-image"
                            ) : ""
                        }
                        alt="canvas image"
                        onDragStart={(e) => e.preventDefault()}
                    />
                </div>}
            </div>
        );
    }

    const getImageInsideRoomBox = (roomNumber, imageSize) => {
        return (
            (imageMode === `image-inside-room${roomNumber}` || imageSize === "minimize-room-image" || imageSize === "room-image-to-mobiles-and-tablets") && !isWaitStatus && !errorMsg && generatedImageURL && <div
                className={`room${roomNumber}-image-box room-image-box mb-4 d-block mx-auto`}
                onClick={() => handleDisplayImageMode(`image-inside-room${roomNumber}`)}
                style={
                    {
                        cursor: !isWaitStatus && imageSize === "minimize-room-image" ? "pointer" : "",
                        position: !imageSize ? "sticky" : "",
                        top: !imageSize ? "90px" : "",
                    }
                }
            >
                {roomNumber === 1 && <img src={room1Image.src} alt="Room Image1 !!" onDragStart={(e) => e.preventDefault()} />}
                {roomNumber === 2 && <img src={room2Image.src} alt="Room Image2 !!" onDragStart={(e) => e.preventDefault()} />}
                {getArtPaintingBox(
                    imageSize === "minimize-room-image" ? `${global_data.appearedImageSizesForTextToImage[paintingType][isExistWhiteBorderWithPoster][tempImageType][tempDimentionsInCm].width / 8}px` : `${global_data.appearedImageSizesForTextToImage[paintingType][isExistWhiteBorderWithPoster][tempImageType][tempDimentionsInCm].width / 3}px`,
                    "minimize-image",
                    true,
                    imageSize === "minimize-room-image" ? true : false,
                )}
            </div>
        );
    }

    const getGeneratedImageGallery = () => {
        return (
            <div className="generated-image-gallery mb-4 border-bottom border-3 pb-3">
                {/* Start Carousel Component From Bootstrap */}
                <Carousel indicators={true} interval={null}>
                    {/* Start Carousel Item */}
                    <Carousel.Item>
                        {getArtPaintingBox(`${global_data.appearedImageSizesForTextToImage[paintingType][isExistWhiteBorderWithPoster][tempImageType][tempDimentionsInCm].width}px`, undefined, false)}
                    </Carousel.Item>
                    {/* End Carousel Item */}
                    {/* Start Carousel Item */}
                    <Carousel.Item>
                        {getImageInsideRoomBox(1, "room-image-to-mobiles-and-tablets")}
                    </Carousel.Item>
                    {/* End Carousel Item */}
                    {/* Start Carousel Item */}
                    <Carousel.Item>
                        {getImageInsideRoomBox(2, "room-image-to-mobiles-and-tablets")}
                    </Carousel.Item>
                    {/* End Carousel Item */}
                </Carousel>
                {/* End Carousel Component From Bootstrap */}
            </div>
        )
    }

    const getProductPrice = async (paintingType, position, dimentions) => {
        try {
            setIsWaitGetProductPrice(true);
            const result = (await axios.get(`${process.env.BASE_API_URL}/prices/prices-by-product-details?productName=${paintingType}&dimentions=${dimentions}&position=${position}`)).data;
            setProductPriceBeforeDiscount(result.data.priceBeforeDiscount);
            setProductPriceAfterDiscount(result.data.priceAfterDiscount);
            setIsWaitGetProductPrice(false);
        }
        catch (err) {
            throw err;
        }
    }

    return (
        // Start Text To Image Service Page
        <div className="text-to-image-service">
            <Head>
                <title>Tavlorify - Förvandla ord till konstverk</title>
            </Head>
            {!isLoadingPage && !errorMsgOnLoadingThePage && <>
                <Header newTotalProductsCount={newTotalProductsCount} />
                {/* Start Overlay */}
                {isShowMoreGeneratedImages && <MoreGeneratedImagesViewer
                    generatedImagesData={generatedImagesData}
                    setIsShowMoreGeneratedImages={setIsShowMoreGeneratedImages}
                    displayPreviousGeneratedImageInsideArtPainting={displayPreviousGeneratedImageInsideArtPainting}
                    selectedPreviousGeneratedImageIndex={selectedPreviousGeneratedImageIndex}
                />}
                {/* End Overlay */}
                {/* Start Page Content */}
                <div className="page-content">
                    {/* Start Container */}
                    <div className="container-fluid pt-2 pb-4">
                        <h1 className="text-center mb-5 welcome-msg pb-2">
                            <span>Använd vårt AI-verktyg med enkla textmeddelanden för att skapa din vackra tavla.</span>
                            <br />
                            <span>Skriv ner dina idéer och se din vision omvandlas till ett livfullt och vackert konstverk.</span>
                        </h1>
                        {/* Start Grid System */}
                        <div className="row">
                            {/* Start Column */}
                            {errorMsg && <div className="col-lg-7">
                                <div className="error-msg-box p-4 text-center">
                                    <BiError className="error-icon mb-3" />
                                    <h5 className="error-msg fw-bold">{errorMsg}</h5>
                                </div>
                            </div>}
                            {/* End Column */}
                            {!errorMsg && !isWaitStatus && <>
                                {/* Start Column */}
                                {windowInnerWidth >= 991 && <div className="col-lg-2">
                                    <div className="minimize-images">
                                        {/* Start Art Painting Box */}
                                        {getArtPaintingBox(`${global_data.appearedImageSizesForTextToImage[paintingType][isExistWhiteBorderWithPoster][tempImageType][tempDimentionsInCm].width / 3}px`, "minimize-image", false)}
                                        {/* End Art Painting Box */}
                                        {getImageInsideRoomBox(1, "minimize-room-image")}
                                        {getImageInsideRoomBox(2, "minimize-room-image")}
                                    </div>
                                </div>}
                                {/* End Column */}
                                {/* Start Column */}
                                <div className="col-lg-5">
                                    {/* Start Art Painting Section */}
                                    {windowInnerWidth >= 991 && getArtPaintingBox(`${global_data.appearedImageSizesForTextToImage[paintingType][isExistWhiteBorderWithPoster][tempImageType][tempDimentionsInCm].width}px`, undefined, false)}
                                    {/* End Art Painting Section */}
                                    {getImageInsideRoomBox(1, undefined)}
                                    {getImageInsideRoomBox(2, undefined)}
                                    {windowInnerWidth < 991 && getGeneratedImageGallery()}
                                </div>
                                {/* End Column */}
                            </>}
                            {isWaitStatus && <div className="col-md-7 text-center">
                                <WaitGeneratingImage />
                            </div>}
                            {/* Start Column */}
                            <div className="col-lg-5">
                                <section className="art-painting-options pe-3 mb-3">
                                    {/* Start Generating Image Options Section */}
                                    <section className="generating-image-options">
                                        <h6 className="mb-2 fw-bold option-section-name text-prompt-caption">Beskriv vad du vill se i ditt konstverk</h6>
                                        <textarea
                                            type="text"
                                            placeholder="En flicka flyger med ett färgglatt paraply i himlen"
                                            className="form-control mb-3 text-prompt"
                                            onChange={(e) => setTextPrompt(e.target.value)}
                                        ></textarea>
                                        <hr className="mb-2 mt-2" />
                                        {/* Start Categories Section */}
                                        <section className="categories mb-0">
                                            <div
                                                className="section-name-and-control-arrows d-flex justify-content-between align-items-center mb-0"
                                                onClick={() => setAppearedArtPaintingOptionSection(value => value === "category-options" ? "" : "category-options")}
                                            >
                                                <h6 className="m-0 fw-bold option-section-name">Vilken kategori tillhör den ?</h6>
                                                {appearedArtPaintingOptionSection !== "category-options" && <IoIosArrowRoundDown className="arrow-icon" />}
                                                {appearedArtPaintingOptionSection === "category-options" && <IoIosArrowRoundUp className="arrow-icon" />}
                                            </div>
                                            <hr className="mb-3 mt-2" />
                                            {appearedArtPaintingOptionSection === "category-options" && <Slider
                                                slidesToShow={getAppearedSlidesCount(windowInnerWidth, "categories", categoriesData.length)}
                                                slidesToScroll={getAppearedSlidesCount(windowInnerWidth, "categories", categoriesData.length)}
                                                infinite={false}
                                                arrows={true}
                                                className="mb-2"
                                            >
                                                {/* Start Category Box */}
                                                {categoriesData.map((category, index) => (
                                                    <div
                                                        className="category-box p-2 text-center"
                                                        onClick={() => handleSelectCategory(index)}
                                                        key={index}
                                                    >
                                                        <img
                                                            src={`${process.env.BASE_API_URL}/${category.imgSrc}`}
                                                            alt={`${category.name} Image`} className="mb-2 category-image d-block mx-auto"
                                                            style={index === categorySelectedIndex ? { border: "4px solid #000" } : {}}
                                                            onDragStart={(e) => e.preventDefault()}
                                                        />
                                                        <p className="category-name m-0 text-center">{category.name}</p>
                                                    </div>
                                                ))}
                                                {/* End Category Box */}
                                            </Slider>}
                                        </section>
                                        {/* End Categories Section */}
                                        <hr className="mb-2 mt-1" />
                                        {/* Start Styles Section */}
                                        <section className="styles mb-0">
                                            <div
                                                className="section-name-and-control-arrows d-flex justify-content-between align-items-center mb-0"
                                                onClick={() => setAppearedArtPaintingOptionSection(value => value === "style-options" ? "" : "style-options")}
                                            >
                                                <h6 className="m-0 fw-bold option-section-name">Vilken stil vill du använda ?</h6>
                                                {appearedArtPaintingOptionSection !== "style-options" && <IoIosArrowRoundDown className="arrow-icon" />}
                                                {appearedArtPaintingOptionSection === "style-options" && <IoIosArrowRoundUp className="arrow-icon" />}
                                            </div>
                                            <hr className="mb-3 mt-2" />
                                            {appearedArtPaintingOptionSection === "style-options" && <Slider
                                                slidesToShow={getAppearedSlidesCount(windowInnerWidth, "styles", categoryStyles.length)}
                                                slidesToScroll={getAppearedSlidesCount(windowInnerWidth, "styles", categoryStyles.length)}
                                                infinite={false}
                                                arrows={true}
                                                className="mb-2"
                                            >
                                                {/* Start Style Box */}
                                                {categoryStyles.map((style, index) => (
                                                    <div
                                                        className="style-box p-2"
                                                        onClick={() => handleSelectStyle(index)}
                                                        key={index}
                                                    >
                                                        <img
                                                            src={`${process.env.BASE_API_URL}/${style.imgSrc}`}
                                                            alt={`${style.name} Image`} className="mb-2 style-image d-block mx-auto"
                                                            style={index === styleSelectedIndex ? { border: "4px solid #000" } : {}}
                                                            onDragStart={(e) => e.preventDefault()}
                                                        />
                                                        <p className="style-name m-0 text-center">{style.name}</p>
                                                    </div>
                                                ))}
                                                {/* End Style Box */}
                                            </Slider>}
                                        </section>
                                        {/* End Styles Section */}
                                    </section>
                                    {/* Start Generating Image Options Section */}
                                    {/* Start Displaying Art Painting Options Section */}
                                    <section className="displaying-art-painting-options">
                                        <h6 className="fw-bold option-section-name text-uppercase">formatet</h6>
                                        {/* Start Positions List */}
                                        <ul className="positions-list text-center pb-3 art-painting-options-list">
                                            <li
                                                onClick={() => handleSelectImageType("vertical", paintingType)}
                                            >
                                                <span
                                                    style={imageType === "vertical" ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >Stående</span>
                                            </li>
                                            <li
                                                onClick={() => handleSelectImageType("horizontal", paintingType)}
                                            >
                                                <span
                                                    style={imageType === "horizontal" ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >Liggande</span>
                                            </li>
                                            <li
                                                onClick={() => handleSelectImageType("square", paintingType)}
                                            >
                                                <span
                                                    style={imageType === "square" ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >Kvadratisk</span>
                                            </li>
                                        </ul>
                                        {/* End Positions List */}
                                        {!isWaitStatus && !errorMsg &&
                                            <button className="btn w-50 d-block mx-auto generate-image-btn mb-3" onClick={generateImageFromText}>SKAPA DIN KONST</button>
                                        }
                                        {isWaitStatus && <button className="btn w-50 generate-image-btn d-block mx-auto mb-3" disabled>skapar ...</button>}
                                        {/* Start Art Names List */}
                                        <ul className="art-names-list d-flex flex-wrap mb-3">
                                            <li
                                                className="p-2 pe-3 ps-3"
                                                onClick={() => handleSelectPaintingType("poster")}
                                                style={(paintingType === "poster" || paintingType === "poster-with-wooden-frame" || paintingType === "poster-with-hangers") ? { fontWeight: "bold", borderBottom: "3px solid #000", backgroundColor: "#EEE" } : {}}
                                            >
                                                POSTERS
                                            </li>
                                            <li
                                                className="p-2 pe-3 ps-3"
                                                onClick={() => handleSelectPaintingType("canvas")}
                                                style={paintingType === "canvas" ? { fontWeight: "bold", borderBottom: "3px solid #000", backgroundColor: "#EEE" } : {}}
                                            >
                                                CANVASTAVLOR
                                            </li>
                                        </ul>
                                        {/* EndArt Names List */}
                                        <h6 className="fw-bold option-section-name text-uppercase">Storlek</h6>
                                        {/* Start Sizes List */}
                                        <ul className="sizes-list text-center pb-3 art-painting-options-list">
                                            {global_data.gelatoDimetions[paintingType][imageType].map((dims, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => handleSelectImageDimentions(dims.inCm)}
                                                >
                                                    <span
                                                        style={dims.inCm === dimentionsInCm ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                    >
                                                        {(dims.inCm === "50x70" || dims.inCm === "70x50" || dims.inCm === "30x30") && <h6 className="fw-bold mb-0 popular-box">populär</h6>}
                                                        {dims.inCm}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                        {/* End Sizes List */}
                                        {(paintingType === "poster" || paintingType === "poster-with-wooden-frame" || paintingType === "poster-with-hangers") && <h6 className="fw-bold option-section-name">KANT</h6>}
                                        {/* Start White Border */}
                                        {(paintingType === "poster" || paintingType === "poster-with-wooden-frame" || paintingType === "poster-with-hangers") && <ul className="white-borders-list text-center pb-3 art-painting-options-list">
                                            <li
                                                onClick={() => handleIsExistWhiteBorderWithPoster("without-border")}
                                            >
                                                <span
                                                    style={isExistWhiteBorderWithPoster === "without-border" ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    Ingen kant
                                                </span>
                                            </li>
                                            <li
                                                onClick={() => handleIsExistWhiteBorderWithPoster("with-border")}
                                            >
                                                <span
                                                    style={isExistWhiteBorderWithPoster === "with-border" ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    Vit kant
                                                </span>
                                            </li>
                                        </ul>}
                                        {/* Start White Border */}
                                        {(paintingType === "poster" || paintingType === "poster-with-wooden-frame" || paintingType === "poster-with-hangers") && <h6 className="fw-bold option-section-name">RAM</h6>}
                                        {/* Start Frames List */}
                                        {(paintingType === "poster" || paintingType === "poster-with-wooden-frame" || paintingType === "poster-with-hangers") && <ul className="frames-list text-center pb-3 art-painting-options-list">
                                            <li
                                                onClick={() => handleSelectFrame("poster", "none")}
                                            >
                                                <span
                                                    style={(frameColor === "none" && paintingType === "poster") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    Utan ram
                                                </span>
                                            </li>
                                            <li
                                                onClick={() => handleSelectFrame("poster-with-wooden-frame", "black")}
                                            >
                                                <span
                                                    style={(frameColor === "black" && paintingType === "poster-with-wooden-frame") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    <img src={normalBlackFrameCornerImage.src} alt="Black Frame Image" onDragStart={(e) => e.preventDefault()} />
                                                    <h6 className="frame-color d-block fw-bold mb-2">TRÄRAM SVART</h6>
                                                </span>
                                            </li>
                                            <li
                                                onClick={() => handleSelectFrame("poster-with-wooden-frame", "white")}
                                            >
                                                <span
                                                    style={(frameColor === "white" && paintingType === "poster-with-wooden-frame") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    <img src={normalWhiteFrameCornerImage.src} alt="White Frame Image" onDragStart={(e) => e.preventDefault()} />
                                                    <h6 className="frame-color d-block fw-bold mb-2">TRÄRAM VIT</h6>
                                                </span>
                                            </li>
                                            <li
                                                onClick={() => handleSelectFrame("poster-with-wooden-frame", "natural-wood")}
                                            >
                                                <span
                                                    style={(frameColor === "natural-wood" && paintingType === "poster-with-wooden-frame") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    <img src={normalWoodFrameCornerImage.src} alt="Wood Frame Image" onDragStart={(e) => e.preventDefault()} />
                                                    <h6 className="frame-color d-block fw-bold mb-2">TRÄRAM NATURLIG</h6>
                                                </span>
                                            </li>
                                            <li
                                                onClick={() => handleSelectFrame("poster-with-wooden-frame", "dark-wood")}
                                            >
                                                <span
                                                    style={(frameColor === "dark-wood" && paintingType === "poster-with-wooden-frame") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    <img src={normalDarkWoodFrameCornerImage.src} alt="Dark Wood Frame Image" onDragStart={(e) => e.preventDefault()} />
                                                    <h6 className="frame-color d-block fw-bold mb-2">TRÄRAM MÖRK</h6>
                                                </span>
                                            </li>
                                            <li
                                                onClick={() => handleSelectFrame("poster-with-hangers", "black")}
                                            >
                                                <span
                                                    style={(frameColor === "black" && paintingType === "poster-with-hangers") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    <img src={hangerBlackFrameCornerImage.src} alt="Black Frame With Hangers Image" onDragStart={(e) => e.preventDefault()} />
                                                    <h6 className="frame-color d-block fw-bold mb-2">POSTERHÄNGARE SVART</h6>
                                                </span>
                                            </li>
                                            <li
                                                onClick={() => handleSelectFrame("poster-with-hangers", "white")}
                                            >
                                                <span
                                                    style={(frameColor === "white" && paintingType === "poster-with-hangers") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    <img src={hangerWhiteFrameCornerImage.src} alt="White Frame With Hangers Image" onDragStart={(e) => e.preventDefault()} />
                                                    <h6 className="frame-color d-block fw-bold mb-2">POSTERHÄNGARE VIT</h6>
                                                </span>
                                            </li>
                                            <li
                                                onClick={() => handleSelectFrame("poster-with-hangers", "natural-wood")}
                                            >
                                                <span
                                                    style={(frameColor === "natural-wood" && paintingType === "poster-with-hangers") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    <img src={hangerWoodFrameCornerImage.src} alt="Wood Frame With Hangers Image" width="50" onDragStart={(e) => e.preventDefault()} />
                                                    <h6 className="frame-color d-block fw-bold">POSTERHÄNGARE NATURLIGT TRÄ</h6>
                                                </span>
                                            </li>
                                            <li
                                                onClick={() => handleSelectFrame("poster-with-hangers", "dark-wood")}
                                            >
                                                <span
                                                    style={(frameColor === "dark-wood" && paintingType === "poster-with-hangers") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    <img src={hangerDarkWoodFrameCornerImage.src} alt="Dark Wood Frame With Hangers Image" onDragStart={(e) => e.preventDefault()} />
                                                    <h6 className="frame-color d-block fw-bold mb-2">POSTERHÄNGARE MÖRK</h6>
                                                </span>
                                            </li>
                                        </ul>}
                                        {/* End Frames List */}
                                    </section>
                                    {/* End Displaying Art Painting Options Section */}
                                </section>
                                {/* Start Add To Cart Managment */}
                                {<div className="add-to-cart-box">
                                    {!isWaitStatus && !errorMsg && !isWaitAddToCart && !errorInAddToCart && !isSuccessAddToCart && !isWaitGetProductPrice && <button
                                        className="btn btn-dark w-100 p-2 add-to-cart-managment-btn mb-3"
                                        onClick={addToCart}
                                    >
                                        <span className="me-2">Lägg i varukorgen |</span>
                                        <span className="me-2">{productPriceAfterDiscount} Kr</span>
                                        {productPriceBeforeDiscount != productPriceAfterDiscount && <span className="text-decoration-line-through me-2">{productPriceBeforeDiscount} </span>}
                                        {productPriceBeforeDiscount != productPriceAfterDiscount && <span>kr</span>}
                                    </button>}
                                    {(isWaitStatus || errorMsg || isWaitGetProductPrice) && <button
                                        className="btn btn-dark w-100 p-2 add-to-cart-managment-btn mb-3"
                                        disabled
                                    >
                                        <span className="me-2">Lägg i varukorgen |</span>
                                        <span className="me-2">{productPriceAfterDiscount} Kr</span>
                                        {productPriceBeforeDiscount != productPriceAfterDiscount && <span className="text-decoration-line-through me-2">{productPriceBeforeDiscount} </span>}
                                        {productPriceBeforeDiscount != productPriceAfterDiscount && <span>kr</span>}
                                    </button>}
                                    {isWaitAddToCart && <button className="btn btn-dark w-100 p-2 add-to-cart-managment-btn mb-3" disabled>Väntar ...</button>}
                                    {isSuccessAddToCart && <button className="btn btn-success w-100 p-2 add-to-cart-managment-btn mb-3" disabled>Lyckad tillsättning i varukorgen ...</button>}
                                    {errorInAddToCart && <button className="btn btn-danger w-100 p-2 add-to-cart-managment-btn mb-3" disabled>{errorInAddToCart}</button>}
                                    <p className="m-0 fw-bold text-center">3-5 dagars leverans • Alltid fri frakt . Klarna</p>
                                </div>}
                                {/* End Add To Cart Managment */}
                            </div>
                            {/* End Column */}
                        </div>
                        {/* End Grid System */}
                        <hr />
                        {/* Start Generated Images Section */}
                        {generatedImagesData?.length > 1 && !isWaitStatus &&
                            <GeneratedImagesViewer
                                generatedImagesData={generatedImagesData}
                                windowInnerWidth={windowInnerWidth}
                                displayPreviousGeneratedImageInsideArtPainting={displayPreviousGeneratedImageInsideArtPainting}
                                setGeneratedImagesData={setGeneratedImagesData}
                                setIsShowMoreGeneratedImages={setIsShowMoreGeneratedImages}
                                selectedPreviousGeneratedImageIndex={selectedPreviousGeneratedImageIndex}
                                serviceName="text-to-image"
                            />
                        }
                        {/* Start Generated Images Section */}
                        {/* Start Painting Details Section */}
                        <PaintingDetails windowInnerWidth={windowInnerWidth} serviceName="text-to-image" />
                        {/* End Painting Details Section */}
                        {/* Start Inspiration Section */}
                        <Inspiration imgSrcs={inspirationImgSrcs} />
                        {/* End Inspiration Section */}
                        {/* Start Customer Comments Section */}
                        <CustomersComments pageName="text-to-image" />
                        {/* End Customer Comments Section */}
                    </div>
                    {/* End Container */}
                </div>
                {/* End Page Content */}
                <Footer />
            </>}
            {isLoadingPage && !errorMsgOnLoadingThePage && <LoaderPage />}
            {errorMsgOnLoadingThePage && <ErrorOnLoadingThePage errorMsg={errorMsgOnLoadingThePage} />}
        </div>
        // End Text To Image Service Page
    );
}

export async function getServerSideProps(context) {
    if ((!context.query.paintingTypeAsQuery && !context.query.generatedImageId) || (context.query.paintingTypeAsQuery && context.query.paintingTypeAsQuery !== "canvas" && context.query.paintingTypeAsQuery !== "poster")) {
        return {
            redirect: {
                permanent: false,
                destination: "/text-to-image?paintingTypeAsQuery=poster",
            },
            props: {
                paintingTypeAsQuery: "poster",
            },
        }
    } else if (!context.query.paintingTypeAsQuery) {
        return {
            props: {
                paintingTypeAsQuery: "",
                generatedImageId: context.query.generatedImageId,
            },
        }
    } else if (!context.query.generatedImageId) {
        return {
            props: {
                paintingTypeAsQuery: context.query.paintingTypeAsQuery,
                generatedImageId: "",
            },
        }
    }
}