from collections import Counter

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.database import get_db

from app.models.skill_gap_analysis import SkillGapAnalysis
from app.models.user import User

from app.utils.security import require_admin


router = APIRouter(
    prefix="/admin/skill-gap",
    tags=["Admin - Skill Gap Monitoring"]
)


# =========================================================
# SKILL GAP MONITORING OVERVIEW
# =========================================================

@router.get("/overview")
def get_skill_gap_overview(
    search: str = "",
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin)
):

    # =====================================================
    # ALL ANALYSES
    # =====================================================

    all_analyses = (
        db.query(SkillGapAnalysis)
        .order_by(
            SkillGapAnalysis.created_at.desc()
        )
        .all()
    )

    total_analyses = len(all_analyses)


    # =====================================================
    # BASIC STATISTICS
    # =====================================================

    match_scores = [
        analysis.skill_match_percentage
        for analysis in all_analyses
    ]

    if match_scores:

        average_match = round(
            sum(match_scores) /
            len(match_scores)
        )

        highest_match = max(match_scores)

    else:

        average_match = 0
        highest_match = 0


    # =====================================================
    # MATCH DISTRIBUTION
    # =====================================================

    high_match = 0
    medium_match = 0
    low_match = 0

    for score in match_scores:

        if score >= 80:

            high_match += 1

        elif score >= 50:

            medium_match += 1

        else:

            low_match += 1


    # =====================================================
    # SKILL COUNTERS
    # =====================================================

    matching_counter = Counter()
    missing_counter = Counter()


    for analysis in all_analyses:

        if analysis.matching_skills:

            skills = [
                skill.strip()
                for skill in
                analysis.matching_skills.split(",")
                if skill.strip()
            ]

            matching_counter.update(
                skills
            )


        if analysis.missing_skills:

            skills = [
                skill.strip()
                for skill in
                analysis.missing_skills.split(",")
                if skill.strip()
            ]

            missing_counter.update(
                skills
            )


    # =====================================================
    # TOP MATCHING SKILLS
    # =====================================================

    top_matching_skills = [

        {
            "skill": skill,
            "count": count
        }

        for skill, count
        in matching_counter.most_common(10)

    ]


    # =====================================================
    # TOP MISSING SKILLS
    # =====================================================

    top_missing_skills = [

        {
            "skill": skill,
            "count": count
        }

        for skill, count
        in missing_counter.most_common(10)

    ]


    # =====================================================
    # SEARCH
    # =====================================================

    search = search.strip()

    query = (
        db.query(
            SkillGapAnalysis,
            User
        )
        .join(
            User,
            SkillGapAnalysis.user_id == User.id
        )
    )


    if search:

        search_pattern = f"%{search}%"

        query = query.filter(
            or_(
                User.full_name.ilike(
                    search_pattern
                ),

                User.email.ilike(
                    search_pattern
                ),

                SkillGapAnalysis.matching_skills.ilike(
                    search_pattern
                ),

                SkillGapAnalysis.missing_skills.ilike(
                    search_pattern
                )
            )
        )


    # =====================================================
    # RECENT ANALYSES
    # =====================================================

    records = (
        query
        .order_by(
            SkillGapAnalysis.created_at.desc()
        )
        .limit(100)
        .all()
    )


    recent_analyses = []


    for analysis, user in records:

        matching_skills = []

        missing_skills = []


        if analysis.matching_skills:

            matching_skills = [
                skill.strip()
                for skill in
                analysis.matching_skills.split(",")
                if skill.strip()
            ]


        if analysis.missing_skills:

            missing_skills = [
                skill.strip()
                for skill in
                analysis.missing_skills.split(",")
                if skill.strip()
            ]


        recent_analyses.append({

            "id": analysis.id,

            "user_id": user.id,

            "user_name":
                user.full_name,

            "user_email":
                user.email,

            "resume_id":
                analysis.resume_id,

            "job_description_id":
                analysis.job_description_id,

            "skill_match_percentage":
                analysis.skill_match_percentage,

            "matching_skills":
                matching_skills,

            "missing_skills":
                missing_skills,

            "created_at":
                analysis.created_at

        })


    # =====================================================
    # RESPONSE
    # =====================================================

    return {

        "statistics": {

            "total_analyses":
                total_analyses,

            "average_match":
                average_match,

            "highest_match":
                highest_match,

            "high_match":
                high_match,

            "medium_match":
                medium_match,

            "low_match":
                low_match

        },

        "top_matching_skills":
            top_matching_skills,

        "top_missing_skills":
            top_missing_skills,

        "recent_analyses":
            recent_analyses

    }